import { Test, TestingModule } from '@nestjs/testing';
import { HumiditysController } from './humiditys.controller';
import { HumiditysService } from './humiditys.service';

describe('HumiditysController', () => {
  let controller: HumiditysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumiditysController],
      providers: [HumiditysService],
    }).compile();

    controller = module.get<HumiditysController>(HumiditysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
