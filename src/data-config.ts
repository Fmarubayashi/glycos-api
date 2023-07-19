import { DataSource } from "typeorm";
import { User } from "./User/Model";
import { Measure } from "./Measure/Model";
import { Observation } from "./Observation/Model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "glycos",
  entities: [User, Measure, Observation],
  synchronize: true,
  logging: false,
});
