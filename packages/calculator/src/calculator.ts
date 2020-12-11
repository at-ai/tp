import * as _ from "lodash";
import { Student } from "./domain";
import { students } from "./students";
import { getCriteriaDimensions } from "./utilities/get-criteria-dimensions";
import { getMarksMean } from "./utilities/get-marks-mean";

export const calculate = (student: Student) => {
  const toCriteriaDimensions = Object.keys(student.criteria).reduce(
    (cd, c) =>
      cd.concat(
        getCriteriaDimensions(c).map((d) => ({
          dimension: d,
          mark: student.criteria[c],
        }))
      ),
    []
  );
  const groupDimensions = _.groupBy(toCriteriaDimensions, "dimension");
  const alpha = Object.keys(groupDimensions).reduce(
    (dimensions, d) => ({
      ...dimensions,
      [d]: getMarksMean(groupDimensions[d].map((value) => value.mark)),
    }),
    {}
  );
  console.log(alpha);
  return alpha;
};

calculate(students[0]);
