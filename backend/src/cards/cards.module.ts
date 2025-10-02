import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports: [PrismaModule],
})
export class CardsModule {}
