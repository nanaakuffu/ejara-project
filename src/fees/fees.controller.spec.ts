import { Test, TestingModule } from '@nestjs/testing';
import DBService from '../db/db.service';
import { FeeController } from './fees.controller';
import { FeeService } from './fees.service';

describe('FeeController', () => {
  let feeController: FeeController;
  let spyService: FeeService;

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     imports: [DBModule],
  //     controllers: [FeeController],
  //     providers: [FeeService],
  //   }).compile();

  //   feeController = app.get<FeeController>(FeeController);
  //   spyService = app.get<FeeService>(FeeService);
  // });

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: FeeService,
      useFactory: () => ({
        getLatestTransactions: jest.fn(() => {}),
        getTransactionByBlockId: jest.fn((blockId: string) => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FeeController],
      providers: [DBService, ApiServiceProvider],
    }).compile();

    feeController = app.get<FeeController>(FeeController);
    spyService = app.get<FeeService>(FeeService);
  });

  describe('/GET latest transactions', () => {
    it('should call the latest transactions', async () => {
      feeController.getLatestTransactions();
      expect(spyService.getLatestTransactions).toHaveBeenCalled();
    });
  });

  describe('/GET transactions by block number', () => {
    it('should call transactions by block number', async () => {
      const blockId = 'blockIdString';
      feeController.getTransactionsByBlockNumber(blockId);
      expect(spyService.getTransactionByBlockId).toHaveBeenCalled();
    });

    it('should return 200 on right call', async () => {
      const blockId = 'blockIdString';
      expect(spyService.getTransactionByBlockId(blockId)).not.toBeNull();
    });
  });
});
