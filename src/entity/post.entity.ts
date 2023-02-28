import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comments.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    photo: string

    @OneToMany(() => CommentEntity, comment => comment.id)
    comments: string[]
}