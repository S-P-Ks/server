import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWTStrategyGuard } from 'src/auth/guards/jwtGuard';
import { PostEntity } from 'src/entity/post.entity';
import { PostService } from './post.service';

@Resolver('post')
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @UseGuards(JWTStrategyGuard)
    @Query()
    getALLPosts(): Promise<PostEntity[]> {
        return this.postService.getAllPosts();
    }

    @UseGuards(JWTStrategyGuard)
    @Query()
    getPostByID(@Args("id", { type: () => Int }) id: number): Promise<PostEntity> {
        return this.postService.getPostById(id);
    }

    @UseGuards(JWTStrategyGuard)
    @Mutation()
    createPost(@Args("images") images: [string], @Args("caption") caption: string): Promise<PostEntity> {
        return this.postService.createPost(images, caption);
    }

    @UseGuards(JWTStrategyGuard)
    @Mutation()
    updatePost(@Args("id", { type: () => Int }) id: number, @Args("images") images: [string], @Args("caption") caption: string): Promise<PostEntity> {
        return this.postService.updatePost(id, images, caption);
    }

    @UseGuards(JWTStrategyGuard)
    @Mutation()
    deletePost(@Args("id", { type: () => Int }) id: number) {
        return this.postService.deletePost(id);
    }
}
