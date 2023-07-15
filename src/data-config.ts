import { DataSource } from "typeorm";
import { User } from "./User/Model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "glycos",
  entities: [User],
  synchronize: true,
  logging: false,
});
