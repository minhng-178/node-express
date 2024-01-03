export type Player = {
  _id: string;
  name: string;
  image: string;
  club: string;
  position: string;
  goals: number;
  isCaptain: boolean;
  meta_data?: string;
  nation_id: string;
};

export type Nation = {
  _id: string;
  name: string;
  description: string;
  meta_data?: string;
};
