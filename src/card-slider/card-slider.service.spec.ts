import { Test, TestingModule } from '@nestjs/testing';
import { CardSliderService } from './card-slider.service';

describe('CardSliderService', () => {
  let service: CardSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardSliderService],
    }).compile();

    service = module.get<CardSliderService>(CardSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
