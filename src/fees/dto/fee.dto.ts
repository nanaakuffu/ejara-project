import { IsNotEmpty, IsNumber } from 'class-validator';

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
