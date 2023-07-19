import { AppDataSource } from "../data-config";
import { Observation } from "./Model";

const ObservationService = () => {
  async function createObservation(data: any) {
    const observation = AppDataSource.getRepository(Observation).create(data);
    const results = await AppDataSource.getRepository(Observation).save(
      observation
    );
    return results;
  }

  async function getObservationsByUserId(id: number) {
    const observations = await AppDataSource.manager
      .getRepository(Observation)
      .findBy({
        patient: { id },
      });
    return observations;
  }
  return {
    createObservation,
    getObservationsByUserId,
  };
};

export default ObservationService;
