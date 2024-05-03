import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.test.ts', () => {

    const dataObj = {
      origin: 'log.entity.test.ts',
      message: 'test-message',
      level: LogSeverityLevel.low
    }

  test('should create a LogEntity instance', async () => {

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

  test('should create a LogEntity instance fromJson', () => {

    const json = `{"level":"low","message":"Service https://www.google.com working","createdAt":"2024-02-02T03:10:10.104Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://www.google.com working");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);

  });

  test('should create a LogEntity instance fromObject', () => {

    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

});