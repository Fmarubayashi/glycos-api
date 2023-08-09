import { Router, Request, Response } from "express";

import { User } from "./User/Model";
import { AppDataSource } from "./data-config";
import MeasureService from "./Measure/Service";
import ObservationService from "./Observation/Service";

const router = Router();

const { createMeasure, getMeasuresByUserId } = MeasureService();
const { createObservation, getObservationsByUserId } = ObservationService();
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

router.post("/measure/create", async (req: Request, res: Response) => {
  const results = await createMeasure(req.body);
  return res.send(results);
});

router.get("/measure/:id", async (req: Request, res: Response) => {
  const results = await getMeasuresByUserId(Number(req.params.id));
  return res.send(results);
});

router.get("/observation/:id", async (req: Request, res: Response) => {
  const results = await getObservationsByUserId(Number(req.params.id));
  return res.send(results);
});

router.post("/observation/create", async (req: Request, res: Response) => {
  const results = await createObservation(req.body);
  return res.send(results);
});

export default router;
