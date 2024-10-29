export type Proposal = {
  id?: number;
  proposer?: string;
  title?: string;
  description?: string;
  created_at?: string;
  start_time?: number;
  end_time?: number;
  options?: {
    name?: string;
    voted?: number;
    valume?: number;
  }[];
  result?: any;
  participants_count?: number;
  matter?: string;
  strategy?: {
    tag?: string;
    info?: string;
    bg?: string;
  };
  valume?: number;
};
