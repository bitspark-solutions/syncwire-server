import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

export interface NotificationRecord {
  id: string;
  deviceId: string;
  sourceType: string;
  sender: string;
  content: string;
  packageName: string;
  timestamp: number;
  receivedAt: Date;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotificationDto): Promise<NotificationRecord> {
    // Dedupe by client-supplied id. If we've seen it, return the stored row.
    const existing = await this.prisma.notification.findUnique({
      where: { id: dto.id },
    });
    if (existing) {
      return this.toRecord(existing);
    }

    const row = await this.prisma.notification.create({
      data: {
        id: dto.id,
        deviceId: dto.deviceId,
        sourceType: dto.sourceType,
        sender: dto.sender,
        content: dto.content,
        packageName: dto.packageName,
        occurredAt: new Date(dto.timestamp),
      },
    });
    return this.toRecord(row);
  }

  async findAll(deviceId?: string, limit = 50): Promise<NotificationRecord[]> {
    const rows = await this.prisma.notification.findMany({
      where: deviceId ? { deviceId } : undefined,
      orderBy: { receivedAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toRecord(r));
  }

  async findOne(id: string): Promise<NotificationRecord> {
    const row = await this.prisma.notification.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException(`Notification ${id} not found`);
    }
    return this.toRecord(row);
  }

  async clearAll(): Promise<void> {
    await this.prisma.notification.deleteMany();
  }

  private toRecord(row: {
    id: string;
    deviceId: string;
    sourceType: string;
    sender: string;
    content: string;
    packageName: string;
    occurredAt: Date;
    receivedAt: Date;
  }): NotificationRecord {
    return {
      id: row.id,
      deviceId: row.deviceId,
      sourceType: row.sourceType,
      sender: row.sender,
      content: row.content,
      packageName: row.packageName,
      timestamp: row.occurredAt.getTime(),
      receivedAt: row.receivedAt,
    };
  }
}
