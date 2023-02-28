import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToMany(() => CommentEntity, comment => comment.id)
    replies: string[]
}