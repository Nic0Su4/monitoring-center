import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('mongo-log.datasource', () => {

  const log = new LogEntity({
    message: 'Test log',
    level: LogSeverityLevel.high,
    origin: 'mongo-log.datasource.test.ts',
  });

  const logDataSource = new MongoLogDatasource();

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('should create a log', async () => {

    const logSpy = jest.spyOn(console, 'log');

    const log = new LogEntity({
      message: 'Test log',
      level: LogSeverityLevel.low,
      origin: 'mongo-log.datasource.test.ts',
    });

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created", expect.any(String));

  });

  test('should get logs', async () => {

    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.high);

  })

})