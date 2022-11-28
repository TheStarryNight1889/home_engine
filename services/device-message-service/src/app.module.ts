import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomingModule } from './incoming/incoming.module';

@Module({
  imports: [
    IncomingModule,
    MongooseModule.forRoot(
      'mongodb://mqtt:mqtt@127.0.0.1:27017?directConnection=true',
      {
        dbName: 'home_engine_raw',
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
