import { Test, TestingModule } from '@nestjs/testing';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

describe('BannerController', () => {
  let controller: BannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerController],
      providers: [BannerService],
    }).compile();

    controller = module.get<BannerController>(BannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
