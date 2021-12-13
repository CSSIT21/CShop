import { Test, TestingModule } from '@nestjs/testing';
import { LogSystemService } from './log-system.service';

describe('LogSystemService', () => {
  let service: LogSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogSystemService],
    }).compile();

    service = module.get<LogSystemService>(LogSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
