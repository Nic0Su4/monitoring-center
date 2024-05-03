import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastucture/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { FileSystemDatasource } from '../infrastucture/datasources/file-system.datasource';
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastucture/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastucture/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);

const emailService = new EmailService();


export class Server {

  static async start() {

    console.log('Server started')

    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   logRepository,
    // ).execute(['nicolas4.rayo@hotmail.com'])

    // const emailService = new EmailService(
    //   fileSystemLogRepository
    // );
    // emailService.sendEmailWithFileSystemLogs([
    //   'nicolas4.rayo@hotmail.com'
    // ])

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://www.google.com';
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          ( error ) => console.log( error )
        ).execute( url );
        // new CheckService().execute('http://localhost:3000/posts');
      }
    );

  }

}

