import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateResourceRatingDto {
  @IsNotEmpty()
  resourceId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { always: true, message: 'Min rating value is 1' })
  @Max(100, { always: true, message: 'Max rating value is 100' })
  rating: number;
}
