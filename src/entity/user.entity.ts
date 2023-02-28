import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column("text")
    bio: string

    @Column({ default: "user" })
    accountType: string

    @Column()
    hashPassword: string

    @Column({ nullable: true, default: "" })
    profilePhoto: string

    @ManyToOne(() => UserEntity, user => user.id, { cascade: true, nullable: true })
    followers

    @OneToMany(() => UserEntity, user => user.id, { cascade: true, nullable: true })
    followings
}