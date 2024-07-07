import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Post('book')
  async bookTicket(@Request() req, @Body() body: { showId: number }) {
    const userId = req.user.id;
    const showId = body.showId;
    return this.ticketService.bookTicket(showId, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getTicketsByUser(@Request() req) {
    const userId = req.user.id;
    return this.ticketService.getTicketsByUser(userId);
  }
}
