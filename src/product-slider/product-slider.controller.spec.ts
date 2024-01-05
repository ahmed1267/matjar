import { Test, TestingModule } from '@nestjs/testing';
import { ProductSliderController } from './product-slider.controller';
import { ProductSliderService } from './product-slider.service';

describe('ProductSliderController', () => {
  let controller: ProductSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSliderController],
      providers: [ProductSliderService],
    }).compile();

    controller = module.get<ProductSliderController>(ProductSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
