import { AppDataSource } from "./ormconfig";

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export { AppDataSource };
