export const filtering = (
  c: any,
  pathway: any,
  adjustment: any,
  year?: any,
  region?: string
) => {
  let base =
    c.pathway_id.toLowerCase() === pathway.toLowerCase() &&
    c.tradeadjustment.toLowerCase() === adjustment.toLowerCase();

  return base;
};
