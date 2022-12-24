import { Test, TestingModule } from '@nestjs/testing';
import { Co2sService } from './co2s.service';

describe('Co2sService', () => {
  let service: Co2sService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Co2sService],
    }).compile();

    service = module.get<Co2sService>(Co2sService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
