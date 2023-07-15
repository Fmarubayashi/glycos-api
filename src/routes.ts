import { Router, Request, Response } from "express";

import { User } from "./User/Model";
import { AppDataSource } from "./data-config";

const router = Router();
AppDataSource?.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.get("/users", async (req: Request, res: Response) => {
  const savedUsers = await AppDataSource.manager.find(User);
  res.json(savedUsers);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const results = await AppDataSource.manager.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  return res.send(results);
});

// router.post("/login", async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const userRepository = getRepository(User);

//   try {
//     const user = await userRepository.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign({ userId: user.id }, "your_secret_key");

//     res.json({ token });
//   } catch (error) {
//     console.log("Login error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
