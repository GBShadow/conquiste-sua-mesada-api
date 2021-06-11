import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Kid from 'modules/kids/typeorm/entities/Kid';

@Entity('todos')
class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  active: boolean;

  @Column()
  kid_id: number;

  @ManyToOne(() => Kid, {
    eager: true,
  })
  @JoinColumn({ name: 'kid_id' })
  kid: Kid;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Todo;
