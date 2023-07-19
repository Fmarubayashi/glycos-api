import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Measure } from "../Measure/Model";
import { Observation } from "../Observation/Model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  CPF: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @Column({ nullable: true })
  gender?: number;

  @Column()
  birthday: string;

  @OneToMany(() => Measure, (measure) => measure.user)
  measures: Measure[];

  @OneToMany(() => Observation, (observation) => observation.doctor)
  doctorObservations: Observation[];

  @OneToMany(() => Observation, (observation) => observation.patient)
  userObservations: Observation[];

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
