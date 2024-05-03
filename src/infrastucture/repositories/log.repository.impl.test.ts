import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl"

describe('log.repository.impl', () => {

  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepository = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('save log should call the datasource with arguments', async () => {

    const log = {
      level: LogSeverityLevel.high,
      message: 'hola',
      origin: 'hola',
    } as LogEntity;

    await logRepository.saveLog(log);

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);

  })

  test('getLogs should call the datasource with arguments', async () => {

    const severityHigh = LogSeverityLevel.high;

    await logRepository.getLogs(severityHigh);
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(severityHigh);

  })

})