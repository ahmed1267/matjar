import { Test, TestingModule } from '@nestjs/testing';
import { PhotoSliderService } from './photo-slider.service';

describe('PhotoSliderService', () => {
  let service: PhotoSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoSliderService],
    }).compile();

    service = module.get<PhotoSliderService>(PhotoSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
