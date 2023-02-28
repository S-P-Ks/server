import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { UserEntity } from 'src/entity/user.entity';
import { AuthResolver } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stategies/JwtStrategy';
import { LocalStrategy } from './stategies/localStrategy';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return ({
          secret: configService.get("JWT_SECRET"),
          signOptions: { expiresIn: 3600 }
        })
      }
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
