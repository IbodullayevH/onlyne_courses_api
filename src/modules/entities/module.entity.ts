import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Modules')
export class Modules {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number

    @Column({ type: "varchar", length: '255', nullable: false, unique: true })
    module_name: string

    @Column({ type: "int", nullable: false })
    courseId: number

    @ManyToOne(() => Course, (course) => course.modules, { onDelete: "CASCADE" })
    course: Course
}

