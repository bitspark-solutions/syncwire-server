import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsIn(['SMS', 'NOTIFICATION'])
  readonly sourceType: 'SMS' | 'NOTIFICATION';

  @IsString()
  @IsNotEmpty()
  readonly sender: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  readonly timestamp: number;

  @IsString()
  @IsNotEmpty()
  readonly packageName: string;
}
