import { Player } from "@/types";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Blog",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const playerDefaultValues: Player = {
  _id: "",
  name: "",
  image: "",
  club: "",
  position: "",
  goals: 0,
  isCaptain: false,
  meta_data: "",
  nation_id: "",
};
