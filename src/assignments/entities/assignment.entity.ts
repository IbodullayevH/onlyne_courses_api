import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Result } from 'src/results/entities/result.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Entity('assignments')
export class Assignment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'int', nullable: false })
    moduleId: number;


    @ManyToOne(() => Modules, (module) => module.assignments, { onDelete: 'CASCADE' })
    module: Modules;

    @OneToMany(() => Result, (result) => result.assignment, { cascade: true })
    results: Result[];
}
