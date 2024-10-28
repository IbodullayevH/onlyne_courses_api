import { Assignment } from "src/assignments/entities/assignment.entity";
import { User } from "src/auth/entities/users.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('submittions')
export class Submittion {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number

    @Column({ type: "int", nullable: false })
    userId: number

    @Column({ type: "int", nullable: false })
    assignmentId: number

    @Column({ type: "text", nullable: true })
    answer: string

    @ManyToOne(() => User, (user) => user.submittion)
    user: User

    @ManyToOne(() => Assignment, (assignment) => assignment.submittion, { onDelete: 'CASCADE' })
    assignment: Assignment;

    @OneToMany(() => Result, (result) => result.submittion, { onDelete: 'SET NULL' })
    result: Result[];
}
