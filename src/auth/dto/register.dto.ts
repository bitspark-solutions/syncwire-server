import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class RegisterDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  // At least one letter, one number. No whitespace.
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)\S{8,128}$/, {
    message:
      'password must contain at least one letter and one number, no whitespace',
  })
  password!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  displayName!: string;

  // @ValidateNested silently passes when the property is absent — @IsDefined
  // makes a missing device a 400 instead of a 500 downstream.
  @IsDefined()
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  device!: DeviceInfoDto;
}
