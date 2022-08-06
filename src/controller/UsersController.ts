import { AppDataSource } from "../data-source";
import { User } from "../model/users";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

class UsersController {
    private userRepository: any;
    constructor() {
        AppDataSource.initialize().then(connection => {
            this.userRepository = connection.getRepository(User);
        });
    }

    showUserList = async (req: Request, res: Response) => {
        let users = await this.userRepository.find();
        res.render('user/user-list', {
            users: users
        });
    }

    showCreateForm = async (req: Request, res: Response) => {
        res.render('user/create-user');
    }

    createUser = async (req: Request, res: Response) => {
        let files = req.files;
        console.log(files);
        
        if (files) {
            let user = req.body
            if (files.avatar && user.name) {
                let image = files.avatar as UploadedFile;
                image.mv('./public/storage/' + image.name);
                user.avatar = 'storage/' + image.name;
                await this.userRepository.save(user);
                res.redirect(301, '/list');
            } else {
                res.render('../views/user/error');
            }
        } else {
            res.render('../views/user/error');
        }
    }

    showUserDetails = async (req: Request, res: Response) => {
        let id = req.params.id;
        let query = `Select * from users_management where id = ?`;
        let result = await this.userRepository.query(query, [id]);
        let user = result[0];
        // let user = await this.userRepository.findOneBy({
        //     id: id
        // })
        res.render('user/details', {
            user: user
        });
    }

    deleteUser = async (req: Request, res: Response) => {
        let id = req.params.id;
        let query = `Delete from users_management where id = ?`;
        await this.userRepository.query(query, [id]);
        // await this.userRepository.delete(id)
        res.redirect(301, '/list');
    }

    showUpdateForm = async (req: Request, res: Response) => {
        res.render('user/update-user');
    }

    updateUser = async (req: Request, res: Response) => {
        let id = req.params.id;
        let userUpdate = await this.userRepository.findOneBy({
            id: id
        });
        let files = req.files;
        if (files) {
            let user = req.body
            if (files.avatar && user.name) {
                let image = files.avatar as UploadedFile;
                // console.log(image.mv);
                image.mv('./public/storage/' + image.name);
                user.avatar = 'storage/' + image.name;
                user = await this.userRepository.merge(userUpdate, user)
                // console.log(user)
                await this.userRepository.save(user);
                res.redirect(301, '/list');
            } else {
                res.render('../views/user/error');
            }
        } else {
            res.render('../views/user/error');
        }
    }
}

export default new UsersController()