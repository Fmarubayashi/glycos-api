import { DataSource } from "typeorm";
import { User } from "./User/Model";
import { Measure } from "./Measure/Model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "glycos",
  entities: [User, Measure],
  synchronize: true,
  logging: false,
});
