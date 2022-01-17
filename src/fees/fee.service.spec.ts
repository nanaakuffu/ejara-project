import { Test, TestingModule } from '@nestjs/testing';
import { FeeService } from './fees.service';
import { HttpModule } from '@nestjs/axios';

describe('FeeService', () => {
  let feeService: FeeService;

  beforeAll(async () => {
    const DBServiceProvider = {
      provide: FeeService,
      useFactory: () => ({
        getLatestTransactions: jest.fn(() => {}),
        getTransactionByBlockId: jest.fn((blockId: string) => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [FeeService, DBServiceProvider],
      imports: [HttpModule],
    }).compile();

    feeService = app.get<FeeService>(FeeService);
  });

  it('FeeService should be defined', async () => {
    expect(feeService).toBeDefined();
  });

  describe('getLatestTransactions', () => {
    it('should call the latest transactions', async () => {
      expect(feeService.getLatestTransactions).not.toBeNull();
    });
  });

  describe('getTransactionByBlockId', () => {
    it('should get the latest transactions by block id', async () => {
      expect(feeService.getTransactionByBlockId).not.toBeNull();
    });
  });
});
