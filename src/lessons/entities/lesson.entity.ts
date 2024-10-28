import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Modules } from "src/modules/entities/module.entity";

export enum LessonType {
    VIDEO = "video",
    TEXT = "text",
}

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false,})
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'enum', enum: LessonType, default: LessonType.TEXT })
    type: LessonType;

    @Column({ type: 'varchar', length: 500, nullable: true })
    videoUrl?: string;

    @Column({ type: 'int', nullable: false })
    moduleId: number;


    @ManyToOne(() => Modules, (module) => module.lessons, { onDelete: 'CASCADE' })
    module: Modules;
}
