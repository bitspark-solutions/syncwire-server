import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { NotificationRecord } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): NotificationRecord {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll(): NotificationRecord[] {
    return this.notificationsService.findAll();
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  clearAll(): void {
    this.notificationsService.clearAll();
  }
}
