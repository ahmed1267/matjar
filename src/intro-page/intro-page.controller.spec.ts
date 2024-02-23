import { Test, TestingModule } from '@nestjs/testing';
import { IntroPageController } from './intro-page.controller';
import { IntroPageService } from './intro-page.service';

describe('IntroPageController', () => {
  let controller: IntroPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntroPageController],
      providers: [IntroPageService],
    }).compile();

    controller = module.get<IntroPageController>(IntroPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
