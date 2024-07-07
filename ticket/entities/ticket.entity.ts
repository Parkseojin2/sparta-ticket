import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Show } from '../../show/entities/show.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show, show => show.tickets)
  show: Show;

  @ManyToOne(() => User, user => user.tickets)
  user: User;

  @Column()
  price: number;

  @Column()
  bookedAt: Date;
}
