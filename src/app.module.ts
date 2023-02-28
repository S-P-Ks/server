import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor } from 'nest-morgan/morgan.interceptor.mixin';
import { GraphQLDefinitionsFactory, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import path, { join } from 'path';
import { UserEntity } from './entity/user.entity';
import { LoggingPlugin } from './apollo.pluging';
import { PostEntity } from './entity/post.entity';
import { CommentEntity } from './entity/comments.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return ({
          type: 'postgres',
          host: `${process.env.DATABASE_HOST}`,
          port: 5432,
          username: `${configService.get("DATABASE_USERNAME")}`,
          password: `${configService.get("DATABASE_PASSWORD")}`,
          database: `${configService.get("DATABASE")}`,
          synchronize: true,
          logging: true,
          entities: [UserEntity, PostEntity, CommentEntity],
        })
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: true,
        methods: "GET,HEAD,PUT,POST,PATCH,DELETE,OPTIONS",
        credentials: true
      },
      driver: ApolloDriver,
      playground: true,
      typePaths: ["./**/*.graphql"],
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      definitions: {
        path: join(process.cwd(), "src/graphql.schema.gql"),
        outputAs: "class",
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingPlugin
  ],
})
export class AppModule { }
