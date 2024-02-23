import { Test, TestingModule } from '@nestjs/testing';
import { AdminRequestsService } from './admin-requests.service';

describe('AdminRequestsService', () => {
  let service: AdminRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminRequestsService],
    }).compile();

    service = module.get<AdminRequestsService>(AdminRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
