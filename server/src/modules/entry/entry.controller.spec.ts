import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';

describe('Entry Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EntryController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EntryController = module.get<EntryController>(EntryController);
    expect(controller).toBeDefined();
  });
});
