import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [UserEntity, TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserResolver, UserService],
  exports: []
})
export class UserModule { }
