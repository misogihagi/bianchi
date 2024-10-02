
const _SheetsConfig = {
  data: {
    headers: ["id", "front", "back","image_urls"] as const,
  },
  image: {
    headers: ["id", "data"] as const,
  },
  transaction: {
    headers: ["transaction", "timestamp"] as const,
  },
  security: {
    headers: ["request", "timestamp"] as const,
},
};

export type SheetName = keyof typeof _SheetsConfig;

export const sheetsConfig = Object.entries(_SheetsConfig).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: {
      name: key,
      ...val,
    },
  }),
  {}
) as {
  [key in SheetName]: {
    name: SheetName;
    headers: typeof _SheetsConfig[key]['headers'];
  };
};
