import { Test, TestingModule } from '@nestjs/testing';
import { SubmittionService } from './submittion.service';

describe('SubmittionService', () => {
  let service: SubmittionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmittionService],
    }).compile();

    service = module.get<SubmittionService>(SubmittionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
