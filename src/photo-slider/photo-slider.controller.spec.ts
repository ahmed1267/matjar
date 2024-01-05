import { Test, TestingModule } from '@nestjs/testing';
import { PhotoSliderController } from './photo-slider.controller';
import { PhotoSliderService } from './photo-slider.service';

describe('PhotoSliderController', () => {
  let controller: PhotoSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoSliderController],
      providers: [PhotoSliderService],
    }).compile();

    controller = module.get<PhotoSliderController>(PhotoSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
