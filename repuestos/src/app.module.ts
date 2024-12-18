import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepuestosModule } from './repuestos/repuestos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RepuestosModule,
    MongooseModule.forRoot('mongodb://localhost:27017/repuestos')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
