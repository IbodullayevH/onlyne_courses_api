import { User } from "src/auth/entities/users.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

export enum Level {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert"
}

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text", unique: true, nullable: false })
    name: string

    @Column({ type: "text", nullable: false })
    description: string

    @Column({ type: "bigint", nullable: false })
    price: number

    @Column({ type: "text", nullable: false })
    category: string

    @Column({ type: "enum", enum: Level, default: Level.BEGINNER })
    level: Level

    @ManyToMany(() => User, user => user.courses)
    users: User[];
}
