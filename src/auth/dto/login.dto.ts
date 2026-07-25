import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  device!: DeviceInfoDto;
}
