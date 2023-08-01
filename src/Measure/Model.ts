import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User/Model";
import { GlucoseCategory } from "../FuzzyLogic/Types";
import { TrendType } from "./Types";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  fasting: boolean;

  @Column()
  exercise: boolean;

  @Column()
  stress: boolean;

  @Column()
  medication: boolean;

  @Column()
  date: Date;

  @Column({ nullable: true })
  trend: string;

  @ManyToOne(() => User, (user) => user.measures)
  user: User;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
