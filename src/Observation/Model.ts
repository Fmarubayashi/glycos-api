import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User/Model";

@Entity()
export class Observation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  observation: string;

  @ManyToOne(() => User, (user) => user.doctorObservations, {
    eager: true,
    nullable: false,
  })
  doctor: User;

  @ManyToOne(() => User, (user) => user.userObservations, {
    eager: true,
    nullable: false,
  })
  patient: User;

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
