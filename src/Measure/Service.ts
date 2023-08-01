import { PythonShell } from "python-shell";
import { GlucoseCategory } from "../FuzzyLogic/Types";
import { AppDataSource } from "../data-config";
import { Measure } from "./Model";
import { execSync } from "child_process";
import { FuzzyDataObject, TrendType } from "./Types";

// Install Python libraries using pip
try {
  execSync("pip3 install numpy scikit-fuzzy");
} catch (err) {
  console.error("Error installing Python libraries:", err.message);
}

const MeasureService = () => {
  async function createMeasure(data: any) {
    const measures = await getMeasuresByUserId(2);
    measures.push(data);
    const sortedMeasures = [...measures].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const fuzzyData: FuzzyDataObject = {
      value: [],
      exercise: [],
      fasting: [],
      stress: [],
      medication: [],
    };

    for (const measure of sortedMeasures) {
      fuzzyData.value.push(measure.value);
      fuzzyData.exercise.push(measure.exercise);
      fuzzyData.fasting.push(measure.fasting);
      fuzzyData.stress.push(measure.stress);
      fuzzyData.medication.push(measure.medication);
    }

    let options = {
      pythonPath: "python3",
      pythonOptions: ["-u"],
      scriptPath: "./src/PythonScripts/",
      args: [JSON.stringify(fuzzyData)],
    };

    try {
      await PythonShell.run("Fuzzy.py", options).then(async (results) => {
        const startIdx = results[1].indexOf("'") + 1;
        const endIdx = results[1].lastIndexOf("'");
        const trend = results[1].slice(startIdx, endIdx);
        const measure = AppDataSource.getRepository(Measure).create({
          ...data,
          trend,
        });
        const resultData = await AppDataSource.getRepository(Measure).save(
          measure
        );
        return resultData;
      });
    } catch (err) {
      return err;
    }
  }

  async function getMeasuresByUserId(id: number) {
    const measures = await AppDataSource.manager.getRepository(Measure).find({
      where: { user: { id } },
      take: 30,
    });
    return measures;
  }

  return {
    createMeasure,
    getMeasuresByUserId,
  };
};

export default MeasureService;
