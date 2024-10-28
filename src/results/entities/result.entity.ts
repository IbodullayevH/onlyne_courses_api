import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/auth/entities/users.entity';

@Entity('results')
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  score: number; // Baholash natijasi

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
  user: User;
}
