import { Test, TestingModule } from '@nestjs/testing';
import { VideoContainerService } from './video-container.service';

describe('VideoContainerService', () => {
  let service: VideoContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoContainerService],
    }).compile();

    service = module.get<VideoContainerService>(VideoContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
