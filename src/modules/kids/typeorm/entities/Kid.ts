import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  JoinTable,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import User from 'modules/users/typeorm/entities/User';
import Todo from 'modules/todos/typeorm/entities/Todo';
import Amount from 'modules/amount/typeorm/entities/Amount';

@Entity('kids')
class Kid {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  todo_id: number;

  @OneToMany(() => Todo, todos => todos.kid)
  @JoinTable({ name: 'todo_id' })
  todos: Todo[];

  @Column()
  amount_id: number;

  @OneToOne(() => Amount, amount => amount.kid)
  @JoinColumn({ name: 'user_id' })
  amount: Amount;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Kid;
