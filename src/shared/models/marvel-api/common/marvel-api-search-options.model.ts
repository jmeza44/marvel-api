import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchOptions {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string; // Return only characters matching the specified full character name (e.g. Spider-Man).

  @ApiProperty()
  @IsString()
  @IsOptional()
  nameStartsWith?: string; // Return characters with names that begin with the specified string (e.g. Sp).

  @ApiProperty()
  @IsOptional()
  modifiedSince?: Date; // Return only characters which have been modified since the specified date.

  @ApiProperty()
  @IsOptional()
  comics?: number[]; // Return only characters which appear in the specified comics (accepts a comma-separated list of ids).

  @ApiProperty()
  @IsOptional()
  series?: number[]; // Return only characters which appear the specified series (accepts a comma-separated list of ids).

  @ApiProperty()
  @IsOptional()
  events?: number[]; // Return only characters which appear in the specified events (accepts a comma-separated list of ids).

  @ApiProperty()
  @IsOptional()
  stories?: number[]; // Return only characters which appear the specified stories (accepts a comma-separated list of ids).

  @ApiProperty()
  @IsOptional()
  orderBy?: 'name' | 'modified' | '-name' | '-modified'; // Order the result set by a field or fields. Add a "-" to the value sort in descending order. Multiple values are given priority in the order in which they are passed.

  @ApiProperty()
  @IsOptional()
  limit?: number; // Limit the result set to the specified number of resources.

  @ApiProperty()
  @IsOptional()
  offset?: number; // Skip the specified number of resources in the result set.
}
