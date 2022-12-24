import { Test, TestingModule } from '@nestjs/testing';
import { Co2sController } from './co2s.controller';
import { Co2sService } from './co2s.service';

describe('Co2sController', () => {
  let controller: Co2sController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Co2sController],
      providers: [Co2sService],
    }).compile();

    controller = module.get<Co2sController>(Co2sController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
