import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mqtt:mqtt@127.0.0.1:27017?directConnection=true',
      {
        dbName: 'home_engine_configuration',
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    DevicesModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
