import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comments.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    caption: string

    @Column("text", { array: true })
    images: string[]

    @OneToMany(() => CommentEntity, comment => comment.id)
    comments: string[]

    @OneToMany(() => UserEntity, user => user.id)
    likes: number
}