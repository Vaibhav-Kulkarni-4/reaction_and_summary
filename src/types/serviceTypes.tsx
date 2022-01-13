export type User = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  emoji?: string;
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

export type UserContentReaction = {
  content_id: number;
  id: number;
  reaction_id: number;
  user_id: number;
};

export type ReactionsForPosts = {
  [key: number]: number;
};

export type AddReactionOnPostResponse = {
  content_id: number;
  id: number;
  reaction_id: number;
  user_id: number;
};
