import { Test, TestingModule } from '@nestjs/testing';
import { HumiditysService } from './humiditys.service';

describe('HumiditysService', () => {
  let service: HumiditysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HumiditysService],
    }).compile();

    service = module.get<HumiditysService>(HumiditysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
