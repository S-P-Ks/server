import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [PostEntity, TypeOrmModule.forFeature([PostEntity])],
  controllers: [],
  providers: [PostResolver, PostService]
})
export class PostModule { }
