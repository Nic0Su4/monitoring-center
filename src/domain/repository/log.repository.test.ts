import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogRepository } from './log.repository';

describe('log.repository.test.ts', () => {

  const newLogEntity = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test',
    level: LogSeverityLevel.low
  })

  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLogEntity]
    }

  }

  test('should test the abstract class', async () => {

    const mockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(typeof mockLogRepository.saveLog).toBe('function');
    expect(typeof mockLogRepository.getLogs).toBe('function');

    await mockLogRepository.saveLog(newLogEntity);
    const logs = await mockLogRepository.getLogs(LogSeverityLevel.low);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);

  })

});