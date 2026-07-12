import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// DTO intentionally free-form. The server is content-agnostic — the Android
// app tags each payload with a `sourceType` string ("NOTIFICATION",
// "SMS", or anything else) and the server stores it as-is.
export class CreateNotificationDto {
  // Client-generated id; used for dedupe.
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  // Free-form tag for the kind of payload the client is forwarding.
  @IsString()
  @IsNotEmpty()
  readonly sourceType: string;

  // Opaque device identifier. For M1, the Android app generates and stores
  // this locally; M2 swaps it for a server-issued deviceId + apiKey.
  @IsString()
  @IsNotEmpty()
  readonly deviceId: string;

  @IsString()
  @IsNotEmpty()
  readonly sender: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  // Milliseconds since epoch (when the notification fired on the device).
  @IsNumber()
  readonly timestamp: number;

  @IsString()
  @IsNotEmpty()
  readonly packageName: string;
}
