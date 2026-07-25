import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { NotificationRecord } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../auth/jwt.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() _user: AccessTokenPayload,
  ): Promise<NotificationRecord> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll(
    @CurrentUser() _user: AccessTokenPayload,
    @Query('deviceId') deviceId?: string,
    @Query('limit') limit?: string,
  ): Promise<NotificationRecord[]> {
    const parsedLimit = limit ? Math.min(200, Math.max(1, Number(limit))) : 50;
    return this.notificationsService.findAll(deviceId, parsedLimit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NotificationRecord> {
    return this.notificationsService.findOne(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  clearAll(): Promise<void> {
    return this.notificationsService.clearAll();
  }
}
