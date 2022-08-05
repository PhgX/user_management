import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users_management'})
export class User {
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    @Column({type: 'varchar'})
    public name!: string;

    @Column({type: 'varchar'})
    public address!: string;

    @Column({type: 'varchar'})
    public email!: string;

    @Column({type: 'varchar'})
    public avatar!: string;     
}