import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * A class to handle the structure of fee data
 */
export class FeeDto {
  @IsNotEmpty()
  block_number: string;

  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @IsNumber()
  average: number;

  @IsNumber()
  median: number;
}
