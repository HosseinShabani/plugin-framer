export interface IAction {
  id: number;
  license_id: number;
  value: number;
  created_at: string;
  model: string;
  input: any;
  images: string[];
}
