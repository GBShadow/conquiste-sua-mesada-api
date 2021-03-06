import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Kid from 'modules/kids/typeorm/entities/Kid';

@Entity('amount')
class Amount {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  total: number;

  @Column()
  kid_id: number;

  @OneToOne(() => Kid, kid => kid.amount)
  @JoinColumn({ name: 'kid_id' })
  kid: Kid;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Amount;
