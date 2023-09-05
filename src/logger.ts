export const logger = (...data: any[]) =>
  console.log(
    "%c[revolt-react-catface] ::%c",
    "font-weight: bold; color: mediumpurple",
    "font-weight: initial; color: initial",
    ...data,
  );
