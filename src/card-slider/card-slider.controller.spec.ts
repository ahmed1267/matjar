import { Test, TestingModule } from '@nestjs/testing';
import { CardSliderController } from './card-slider.controller';
import { CardSliderService } from './card-slider.service';

describe('CardSliderController', () => {
  let controller: CardSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardSliderController],
      providers: [CardSliderService],
    }).compile();

    controller = module.get<CardSliderController>(CardSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
