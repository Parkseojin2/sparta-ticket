import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Role } from '../types/userRole.type';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[];
}
