import { endCountries } from "./endCountries";

export const sortByCountry = (array: any[]) => {
  return array.sort((a, b) => {
    // If 'a' is in the endCountries set and 'b' is not, 'a' should come after 'b'
    if (endCountries.has(a!.valueX) && !endCountries.has(b!.valueX)) {
      return 1;
    }
    // If 'b' is in the endCountries set and 'a' is not, 'b' should come after 'a'
    if (!endCountries.has(a!.valueX) && endCountries.has(b!.valueX)) {
      return -1;
    }
    // If both or neither are in the endCountries set, sort alphabetically
    return a!.valueX.localeCompare(b!.valueX);
  });
};

export const sortByYear = (array: any[]) => {
  return array.sort((a, b) => a!.valueX - b!.valueX);
};
