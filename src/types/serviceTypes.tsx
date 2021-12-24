export type User = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  emoji: string;
  name: string;
};

export type Reaction = {
  emoji: string;
  id: number;
  name: string;
};

export type SummaryTabs = {
  [key: string]: {
    name: string;
    current: boolean;
    emoji: any;
    id: number;
  };
};
