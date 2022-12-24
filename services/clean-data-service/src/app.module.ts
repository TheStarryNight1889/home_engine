import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HumiditysModule } from './humiditys/humiditys.module';
import { TemperaturesModule } from './temperatures/temperatures.module';
import { Co2sModule } from './co2s/co2s.module';
import { AggregationsService } from './aggregations/aggregations.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://mqtt:mqtt@127.0.0.1:27017?directConnection=true',
      {
        dbName: 'home_engine_clean_data',
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    HumiditysModule,
    TemperaturesModule,
    Co2sModule,
  ],
  controllers: [AppController],
  providers: [AppService, AggregationsService],
})
export class AppModule {}
