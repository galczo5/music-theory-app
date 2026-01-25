import type { Game } from '~/types/game';
import { GameCard } from '~/components/chooser/gameCard';

type GameListProps = {
  games: Game[];
};

export const GamesList = ({ games }: GameListProps) => {
  return (
    <div className="xl:container xs:max-w-full grid sm:grid-cols-1 md:grid-cols-2 gap-2">
      {games.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </div>
  );
};
