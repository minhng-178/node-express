import { usePlayers } from "@/hooks/usePlayers";
import Card from "./Card";

type CollectionProps = {
  emptyTitle: string;
  emptyStateSubtext: string;
};

const Collection = ({ emptyTitle, emptyStateSubtext }: CollectionProps) => {
  const { players, isLoading } = usePlayers();

  if (isLoading) {
    return (
      <div>
        <Card.Skeleton />
      </div>
    );
  }

  return (
    <>
      {players && players.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {players.map((player) => {
              return (
                <li key={player._id} className="flex justify-center">
                  <Card player={player} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
