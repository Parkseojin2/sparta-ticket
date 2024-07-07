
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Show } from './show.entity';

@Entity()
export class ShowTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  dateTime: Date;

  @ManyToMany(() => Show, show => show.showTimes)
  shows: Show[];
}

