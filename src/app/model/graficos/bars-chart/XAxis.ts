

export class XAxis {
  constructor(
    public type?: "category" | "datetime" | "numeric",
    public categories?: any,
    public labels?: {
      style?: {
        colors?: string | string[];
        fontSize?: string;
      }
    }
  ) { }
};