import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ShowTime } from './showTime.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  imageUrl: string;

  @ManyToMany(() => ShowTime, { cascade: true })
  @JoinTable()
  showTimes: ShowTime[];

  @Column({ type: 'int', nullable: false })
  seatsInfo: number;

  @OneToMany(() => Ticket, ticket => ticket.show)
  tickets: Ticket[];
}
