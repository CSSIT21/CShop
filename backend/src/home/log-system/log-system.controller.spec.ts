import { Test, TestingModule } from '@nestjs/testing';
import { LogSystemController } from './log-system.controller';
import { LogSystemService } from './log-system.service';

describe('LogSystemController', () => {
  let controller: LogSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogSystemController],
      providers: [LogSystemService],
    }).compile();

    controller = module.get<LogSystemController>(LogSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
