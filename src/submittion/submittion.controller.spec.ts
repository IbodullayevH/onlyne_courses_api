import { Test, TestingModule } from '@nestjs/testing';
import { SubmittionController } from './submittion.controller';
import { SubmittionService } from './submittion.service';

describe('SubmittionController', () => {
  let controller: SubmittionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmittionController],
      providers: [SubmittionService],
    }).compile();

    controller = module.get<SubmittionController>(SubmittionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
