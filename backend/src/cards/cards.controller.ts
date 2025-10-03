import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/create-card.dto';
import { JwtGuard } from 'src/auth/guards/Jwt.guard';
import { UserPayload } from 'src/types';
import { GetCurrentUser } from 'src/auth/decorators/GetCurrentUser.decorator';
import { Level } from '@prisma/client';
import { EditCardDto } from './dtos/edit-card.dto';
import { JwtGuard_RefreshToken } from 'src/auth/guards/Jwt-refresh-token.guard';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}
  @Post('create')
  @UseGuards(JwtGuard)
  createCard(
    @Body() body: CreateCardDto,
    @GetCurrentUser() userPayload: UserPayload,
  ) {
    return this.cardsService.createCard(body, userPayload);
  }

  @Get('all-cards')
  @UseGuards(JwtGuard)
  @UseGuards(JwtGuard_RefreshToken)
  getAllCards() {
    return this.cardsService.getAllCards();
  }
  @Get('level')
  getCardsByLevel(@Query('level') level: Level) {
    return this.cardsService.getCardsByLevel(level);
  }

  @Patch('edit/:id')
  @UseGuards(JwtGuard)
  @UseGuards(JwtGuard_RefreshToken)
  editCard(
    @Param('id') id: string,
    @Body() body: EditCardDto,
    @GetCurrentUser() userPayload: UserPayload,
  ) {
    return this.cardsService.editCard(id, body, userPayload);
  }

  @Get(':id')
  getCardById(@Param('id') id: string) {
    return this.cardsService.getCardById(id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  deleteCard(
    @Param('id') id: string,
    @GetCurrentUser() userPayload: UserPayload,
  ) {
    return this.cardsService.deleteCard(id, userPayload);
  }
}
