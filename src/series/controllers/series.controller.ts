import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor() {}
}
