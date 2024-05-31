import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comics')
@Controller('comics')
export class ComicsController {
  constructor() {}
}
