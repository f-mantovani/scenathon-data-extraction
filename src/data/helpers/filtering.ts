export const filtering = (c: any, pathway: any, adjustment: any) => {
  const trade2021 = c.Scenathon?.split("_");
  const id =
    c.pathway_id?.toLowerCase() ??
    (trade2021[0].toLowerCase() === "sust" ? "gs" : "ct");
  //  Need to wrap in parenthesis otherwise it will return the second part always
  const tradeadjustment =
    c.tradeadjustment?.toLowerCase() ?? (trade2021[1] === "BT" ? "no" : "yes");

  return (
    id === pathway.toLowerCase() && tradeadjustment === adjustment.toLowerCase()
  );
};
