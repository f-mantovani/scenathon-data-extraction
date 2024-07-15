import type { identifiers } from "./identifier";

export const mapper = (c: any, identifier: keyof typeof identifiers) => {
  if (identifier === "average_calories") {
    const lowerBound = c.MDER_lowerbound;
    const upperBound = c.MDER_upperbound;
    return {
      valueX: c.location,
      avg_intake: c.kcal_feas,
      lowerBound,
      upperBound,
    };
  }

  if (identifier === "calories_by_country") {
    const lowerBound = c.MDER_lowerbound;
    const upperBound = c.MDER_upperbound;
    return {
      valueX: c.year,
      avg_intake: c.kcal_feas,
      lowerBound,
      upperBound,
      location: c.location,
    };
  }

  if (identifier === "undernourishment") {
    if (typeof c.pou === "string") c.pou = 0.025;
    return {
      valueX: c.location,
      pou: c.pou * 100,
    };
  }

  if (identifier === "undernourishment_by_country") {
    if (typeof c.pou === "string") c.pou = 0.025;
    return {
      valueX: c.year,
      pou: c.pou * 100,
      location: c.location,
    };
  }

  if (identifier === "land_inside_protected") {
    return {
      valueX: c.year,
      protectedareasforest: c.protectedareasforest,
      protectedareasothernat: c.protectedareasothernat,
      protectedareasother: c.protectedareasother,
      oecmareas: c.oecmareas,
    };
  }
};
