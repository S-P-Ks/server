import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) { }

    getAllPosts(): Promise<PostEntity[]> {
        console.log("G HE")
        return this.postRepository.find();
    }

    getPostById(id: number): Promise<PostEntity> {
        return this.postRepository.findOne({ where: { id: id } })
    }

    createPost(images: [string], caption: string) {
        const post = this.postRepository.create();
        post.caption = caption;
        post.images = images;

        return this.postRepository.save(post);
    }

    async updatePost(id: number, images: [string], caption: string) {
        const post = await this.postRepository.findOne({ where: { id: id } });
        post.caption = caption;
        post.images = images;

        return this.postRepository.save(post);
    }

    async deletePost(id: number) {
        try {
            const res = await this.postRepository.delete(id);
            console.log(res);
            return { deleted: true };
        } catch (error) {
            return { deleted: false };
        }
    }
}
