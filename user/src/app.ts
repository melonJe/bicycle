import "reflect-metadata";
import express from "express";
import { connectDatabase, AppDataSource } from "./config/database";
import { User } from "./entity/User";

const app = express();
app.use(express.json());

connectDatabase().then(() => {
  console.log("Data Source initialized");

  const userRepository = AppDataSource.getRepository(User);

  // Create a new user
  app.post("/users", async (req, res) => {
    const { name, email, password_hash, password_salt } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.passwordHash = password_hash;
    user.passwordSalt = password_salt;

    try {
      const savedUser = await userRepository.save(user);
      res.json(savedUser);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  });

  // Read a user by ID
  app.get("/users/:id", async (req, res) => {
    try {
      const user = await userRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  });

  // Update a user
  app.put("/users/:id", async (req, res) => {
    try {
      const user = await userRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      if (user) {
        userRepository.merge(user, req.body);
        const result = await userRepository.save(user);
        res.json(result);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating user" });
    }
  });

  // Delete a user
  app.delete("/users/:id", async (req, res) => {
    try {
      const result = await userRepository.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error deleting user" });
    }
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

export default app;
