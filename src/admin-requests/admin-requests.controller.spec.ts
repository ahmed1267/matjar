import { Test, TestingModule } from '@nestjs/testing';
import { AdminRequestsController } from './admin-requests.controller';
import { AdminRequestsService } from './admin-requests.service';

describe('AdminRequestsController', () => {
  let controller: AdminRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminRequestsController],
      providers: [AdminRequestsService],
    }).compile();

    controller = module.get<AdminRequestsController>(AdminRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
