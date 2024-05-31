import { HttpModule, HttpService } from '@nestjs/axios';
import {
  InternalServerErrorException,
  Logger,
  Module,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class SharedModule implements OnModuleInit {
  private readonly marvelApiBaseUrl: string = this.configService.get<string>(
    'MARVEL_API_BASE_URL',
  );
  private readonly publicKey: string = this.configService.get<string>(
    'MARVEL_API_PUBLIC_API_KEY',
  );
  private readonly privateKey: string = this.configService.get<string>(
    'MARVEL_API_PRIVATE_API_KEY',
  );

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((request) => {
      if (request.url.startsWith(this.marvelApiBaseUrl)) {
        request = {
          ...request,
          params: this.appendMarvelApiAuthentication(
            request.params ?? new URLSearchParams(),
          ),
        };
      }
      return request;
    });

    this.httpService.axiosRef.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: any) => {
        if (error.response.status === 404) {
          Logger.warn(
            `[External Marvel API Not Found Error] Status Code: ${error['response']['data']['code']} - Message: ${error['response']['data']['status']} - Request Path: ${error['request']['path']}`,
          );
          throw new NotFoundException(`${error['response']['data']['status']}`);
        } else {
          Logger.error(
            `[External Marvel API Error] Status Code: ${error['response']['data']['code']} - Message: ${error['response']['data']['status']} - Request Path: ${error['request']['path']}`,
          );
          throw new InternalServerErrorException(
            `${error['response']['data']['status']}`,
          );
        }
      },
    );
  }

  private appendMarvelApiAuthentication(
    params: URLSearchParams,
  ): URLSearchParams {
    const ts = new Date().getTime().toString();
    const hash = crypto
      .createHash('md5')
      .update(ts + this.privateKey + this.publicKey)
      .digest('hex');

    params.append('ts', ts);
    params.append('hash', hash);
    params.append('apikey', this.publicKey);

    return params;
  }
}
