import { Test, TestingModule } from '@nestjs/testing';
import { IntroPageService } from './intro-page.service';

describe('IntroPageService', () => {
  let service: IntroPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntroPageService],
    }).compile();

    service = module.get<IntroPageService>(IntroPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
