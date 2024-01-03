import { Link } from "react-router-dom";

import { Player } from "@/types";
import editIcons from "@/assets/icons/edit.svg";
import { useNations } from "@/hooks/useNations";
import { Skeleton } from "@/components/ui/skeleton";

type CardProps = {
  player: Player;
};

const Card = ({ player }: CardProps) => {
  const { nations } = useNations();

  const nation = nations?.find((nation) => nation._id === player.nation_id);

  const nationName = nation ? nation.name : "Nation not found";

  return (
    <div className="group relative flex min-h-[540px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[720px]">
      <Link
        to={`/player/${player._id}`}
        style={{ backgroundImage: `url(${player.image})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
        <Link to={`/events/${player._id}/update`}>
          <img
            src={editIcons}
            alt="edit"
            width={20}
            height={20}
            className="hover:opacity-75 transition-opacity duration-200"
          />
        </Link>
      </div>

      <div className="flex min-h-[180px] flex-col gap-3 p-5 md:gap-4">
        <Link
          to={`/player/${player._id}`}
          className="hover:text-primary-500 transition-colors duration-200"
        >
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {player.name}
          </p>
        </Link>

        <div className="flex-between gap-2">
          <span className="p-semibold-14 w-max rounded-full bg-green-100 px-4 py-1 text-green-60">
            {player.club}
          </span>
          <p className="p-semibold-14 w-max rounded-full bg-blue-100 px-4 py-1 text-blue-60 line-clamp-1">
            {nationName}
          </p>
        </div>

        <div className="flex-between w-full">
          <p className="p-medium-16 p-medium-18 text-grey-500">
            Goals: {player.goals}
          </p>
          <p className="p-medium-16 p-medium-18 text-grey-500">
            Position: {player.position}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.Skeleton = function CardSkeleton() {
  return <Skeleton className="min-h-[540px] w-full md:min-h-[720px]" />;
};
