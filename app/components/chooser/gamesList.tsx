import type { Game } from '~/types/game';
import { GameCard } from '~/components/chooser/gameCard';

type GameListProps = {
  games: Game[];
};

export const GamesList = ({ games }: GameListProps) => {
  const gamesCol1 = games.filter((value, index) => !(index % 2));
  const gamesCol2 = games.filter((value, index) => index % 2);

  return (
    <div className="xl:max-w-2/3 xs:max-w-full grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        {gamesCol1.map((g) => (
          <GameCard game={g} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {gamesCol2.map((g) => (
          <GameCard game={g} />
        ))}
      </div>
    </div>
  );
};
