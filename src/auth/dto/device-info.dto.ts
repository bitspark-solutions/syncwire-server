import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { DevicePlatform } from '../../../prisma/generated/client/client';

/** Nested `device` block on register/login — the physical install. */
export class DeviceInfoDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name!: string;

  @IsEnum(DevicePlatform)
  platform!: DevicePlatform;
}
