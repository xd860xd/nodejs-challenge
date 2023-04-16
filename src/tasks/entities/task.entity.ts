import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TaskStatus } from '../enum/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  comments: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'user' })
  user: User;

}
