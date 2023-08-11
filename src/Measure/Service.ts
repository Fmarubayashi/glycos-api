import { execSync } from "child_process";
import { PythonShell } from "python-shell";
import { AppDataSource } from "../data-config";
import { Measure } from "./Model";
import { FuzzyDataObject, TrendType } from "./Types";

try {
  execSync("pip3 install numpy scikit-fuzzy");
} catch (err) {
  console.error("Error installing Python libraries:", err.message);
}

const MeasureService = () => {
  async function createMeasure(data: any) {
    const measures = await getMeasuresByUserId(2, 7);
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
        const trendType = getTrendType(trend);
        const measure = AppDataSource.getRepository(Measure).create({
          ...data,
          trend: trendType,
        });
        const resultData = await AppDataSource.getRepository(Measure).save(
          measure
        );
        if (resultData) {
          return resultData;
        } else {
          throw { error: "error" };
        }
      });
    } catch (err) {
      return err;
    }
  }

  function getTrendType(trend: string) {
    switch (trend) {
      case "increase":
        return TrendType.Increase;
      case "stabilize":
        return TrendType.Stabilize;
      case "decrease":
        return TrendType.Descrease;
      case undefined:
        throw Error;
    }
  }

  async function getMeasuresByUserId(id: number, limit?: number) {
    const measures = await AppDataSource.manager.getRepository(Measure).find({
      where: { user: { id } },
      ...(limit && { take: limit }),
      order: { date: "desc" },
    });
    return measures;
  }

  return {
    createMeasure,
    getMeasuresByUserId,
  };
};

export default MeasureService;
