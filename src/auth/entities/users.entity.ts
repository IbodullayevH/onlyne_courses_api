import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: '300', nullable: false })
    name: string;

    @Column({ nullable: false, type: "varchar", length: "60", unique: true })
    email: string;

    @Column({ nullable: false, type: "text" })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

}
