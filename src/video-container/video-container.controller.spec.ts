import { Test, TestingModule } from '@nestjs/testing';
import { VideoContainerController } from './video-container.controller';
import { VideoContainerService } from './video-container.service';

describe('VideoContainerController', () => {
  let controller: VideoContainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoContainerController],
      providers: [VideoContainerService],
    }).compile();

    controller = module.get<VideoContainerController>(VideoContainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
