import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface CheckServicMultipleUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements CheckServicMultipleUseCase {

  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogsRepository( log: LogEntity ) {
    this.logRepositories.forEach( logRepository => logRepository.saveLog(log) );
  }

  public async execute( url: string ): Promise<boolean> {

    try {

      const request = await fetch( url );
      if (!request.ok) {
        throw new Error ( `Error on check service ${url}` );
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts',
      });

      this.callLogsRepository( log );
      this.successCallback && this.successCallback();

      return true;

    } catch ( error ) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });
      this.callLogsRepository( log );
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }

  }

}

