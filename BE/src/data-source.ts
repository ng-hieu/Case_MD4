import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "sales",
    synchronize: true,
    logging: false,
    entities: ["dist/src/model/*.js"]
})