import { Test, TestingModule } from '@nestjs/testing';
import { ProductSliderService } from './product-slider.service';

describe('ProductSliderService', () => {
  let service: ProductSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSliderService],
    }).compile();

    service = module.get<ProductSliderService>(ProductSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
