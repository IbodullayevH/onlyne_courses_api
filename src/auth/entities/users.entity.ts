import { Course } from 'src/courses/entities/course.entity';
import { Result } from 'src/results/entities/result.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Submittion } from 'src/submittion/entities/submittion.entity';

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

    @ManyToMany(() => Course, course => course.users)
    @JoinTable()
    courses: Course[];

    @OneToMany(() => Result, (result) => result.user)
    results: Result[];

    @OneToMany(() => Submittion, (submittion) => submittion.user)
    submittion: Submittion[];
}

