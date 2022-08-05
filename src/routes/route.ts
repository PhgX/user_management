import express from 'express';
import  UserController  from '../controller/UsersController';

export const routes = express.Router();

routes.get('/list', UserController.showUserList);
routes.get('/create', UserController.showCreateForm);
routes.post('/create', UserController.createUser);
routes.get('/user/details/:id', UserController.showUserDetails);
routes.get('/delete/:id', UserController.deleteUser);
routes.get('/update/:id', UserController.showUpdateForm);
routes.post('/update/:id', UserController.updateUser);