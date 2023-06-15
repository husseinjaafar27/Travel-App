import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.PORT1,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(`Unable to connect to the database  ${err}`);
  });

sequelize.sync();

export default sequelize;
