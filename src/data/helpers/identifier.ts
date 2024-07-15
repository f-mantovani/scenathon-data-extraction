export const identifiers = {
  undernourishment: ["pou"],
  average_calories: ["avg_intake"],
  undernourishment_by_country: ["pou"],
  calories_by_country: ["avg_intake"],
  land_inside_protected: [
    "protectedareasforest",
    "protectedareasothernat",
    "protectedareasother",
    "oecmareas",
  ],
};

export type Identifiers = keyof typeof identifiers;
