import { ApiProperty } from '@nestjs/swagger';
import { Fee } from '@prisma/client';

/**
 * A class for the structure of the fee object
 */
export class FeeEntity implements Fee {
  @ApiProperty()
  id: number;

  @ApiProperty()
  block_number: string;

  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;

  @ApiProperty()
  average: number;

  @ApiProperty()
  median: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
