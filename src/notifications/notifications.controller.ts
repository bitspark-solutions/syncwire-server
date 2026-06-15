import { Controller, Get, Post, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { NotificationRecord } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './notifications.gateway';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  create(@Body() createNotificationDto: CreateNotificationDto): NotificationRecord {
    const record = this.notificationsService.create(createNotificationDto);
    this.notificationsGateway.broadcastNotification(record);
    return record;
  }

  @Get()
  findAll(): NotificationRecord[] {
    return this.notificationsService.findAll();
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT) // 244 No Content
  clearAll(): void {
    this.notificationsService.clearAll();
  }
}
