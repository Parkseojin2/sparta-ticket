import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { Show } from './entities/show.entity';
import { ShowTime } from './entities/showTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, ShowTime])],
  providers: [ShowService],
  exports: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
