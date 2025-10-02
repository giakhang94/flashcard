import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dtos/create-card.dto';
import { UserPayload } from 'src/types';
import { isAdmin } from 'src/ultis/checkAdmin';
import { Level, Role } from '@prisma/client';
import { EditCardDto } from './dtos/edit-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}
  async createCard(body: CreateCardDto, userPayload: UserPayload) {
    isAdmin(userPayload.role);
    const existingHiragana = await this.prisma.card.findUnique({
      where: { hiragana: body.hiragana },
    });
    if (existingHiragana)
      throw new BadRequestException('This word has already existed');
    return await this.prisma.card.create({
      data: { ...body, lesson: Number(body.lesson) },
    });
  }

  async getAllCards() {
    return this.prisma.card.findMany();
  }

  async getCardsByLevel(level: Level) {
    return this.prisma.card.findMany({ where: { level } });
  }
  async editCard(id: string, body: EditCardDto, userPayload: UserPayload) {
    isAdmin(userPayload.role);
    const existingCard = await this.prisma.card.findUnique({ where: { id } });
    if (!existingCard) throw new NotFoundException('card not found');

    const updatedCard = await this.prisma.card.update({
      where: { id },
      data: body,
    });
    return updatedCard;
  }

  async getCardById(id: string) {
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) {
      throw new NotFoundException('Card Not Found');
    }
    return card;
  }

  async deleteCard(id: string, userPayload: UserPayload) {
    if (userPayload.role !== Role.admin)
      throw new ForbiddenException('Delete con cac');
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) throw new NotFoundException('card not found');
    await this.prisma.card.delete({ where: { id } });
    return { message: 'card deleted' };
  }
}
