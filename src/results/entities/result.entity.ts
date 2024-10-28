import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/auth/entities/users.entity';
import { Submittion } from 'src/submittion/entities/submittion.entity';

@Entity('results')
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  score: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  assignmentId: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Submittion, (submittion) => submittion.assignment, { cascade: true })
  submittion: Submittion;
}
