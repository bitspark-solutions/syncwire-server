import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

export interface NotificationRecord {
  id: string;
  sourceType: 'SMS' | 'NOTIFICATION';
  sender: string;
  content: string;
  timestamp: number;
  packageName: string;
  receivedAt: Date;
}

@Injectable()
export class NotificationsService {
  private readonly notifications: NotificationRecord[] = [];
  private readonly MAX_LIMIT = 100;

  create(dto: CreateNotificationDto): NotificationRecord {
    // Check if notification with same ID already exists to prevent duplication
    const existingIndex = this.notifications.findIndex((n) => n.id === dto.id);
    if (existingIndex !== -1) {
      return this.notifications[existingIndex];
    }

    const record: NotificationRecord = {
      ...dto,
      receivedAt: new Date(),
    };

    // Prepend to array (newest first)
    this.notifications.unshift(record);

    // Keep size under the limit
    if (this.notifications.length > this.MAX_LIMIT) {
      this.notifications.pop();
    }

    return record;
  }

  findAll(): NotificationRecord[] {
    return this.notifications;
  }

  clearAll(): void {
    this.notifications.length = 0;
  }
}
