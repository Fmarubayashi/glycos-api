import { AppDataSource } from "../data-config";
import { Measure } from "./Model";

const MeasureService = () => {
  async function createMeasure(data: any) {
    const measure = AppDataSource.getRepository(Measure).create(data);
    const results = await AppDataSource.getRepository(Measure).save(measure);
    return results;
  }

  async function getMeasuresByUserId(id: number) {
    const measures = await AppDataSource.manager.getRepository(Measure).findBy({
      user: { id },
    });
    return measures;
  }
  return {
    createMeasure,
    getMeasuresByUserId,
  };
};

export default MeasureService;
