import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { Show } from '../show/entities/show.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async bookTicket(showId: number, userId: number): Promise<Ticket> {
    const show = await this.showRepository.findOne({where: {id:showId}});
    if (!show) {
      throw new NotFoundException('찾으시는 공연을 찾을 수 없습니다');
    }

    if (show.seatsInfo <= 0) {
      throw new BadRequestException('잔여 좌석이 없습니다.');
    }

    const user = await this.userRepository.findOne({where: {id:userId}});
    if (!user) {
      throw new NotFoundException('사용자 정보를 확인하여 주십시오.');
    }

    if (user.points < show.price) {
      throw new BadRequestException('잔여 포인트를 다시 확인하여 주십시오.');
    }

    const queryRunner = this.ticketRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
 
      user.points -= show.price;
      await queryRunner.manager.save(user);

  
      show.seatsInfo -= 1;
      await queryRunner.manager.save(show);


      const ticket = new Ticket();
      ticket.show = show;
      ticket.user = user;
      ticket.price = show.price;
      ticket.bookedAt = new Date();
      await queryRunner.manager.save(ticket);

      await queryRunner.commitTransaction();
      return ticket;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTicketsByUser(userId: number): Promise<Ticket[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tickets', 'tickets.show'] });
    if (!user) {
      throw new NotFoundException('사용자 정보를 확인하여 주십시오.');
    }

    return user.tickets;
  }
}
