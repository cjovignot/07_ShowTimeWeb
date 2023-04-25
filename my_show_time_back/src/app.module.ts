import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { ConcertModule } from './concert/concert.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://showtime_superadmin:showttimeadmin@cluster0.sji4m3i.mongodb.net/Cluster0?retryWrites=true&w=majority'),
    JwtModule.register({ secret, signOptions: { expiresIn: '2h' } }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    ConcertModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
