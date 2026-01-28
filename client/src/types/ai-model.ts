export type AIModel = {
  id: number;
  title: string;
  name: string;
  tags: string[];
  created_at: string;
  firm: string;
  image: string;
  prompt: {
    name: string;
    label: string;
    rules: any;
    placeholder: string;
  };
  inputs: { fields: any[] };
  advance: { fields: any[] };
  default_values: Record<string, any>;
};
