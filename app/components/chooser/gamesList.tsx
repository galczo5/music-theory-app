import type { Game } from '~/types/game';
import { GameCard } from '~/components/chooser/gameCard';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

type GameListProps = {
  games: Game[];
};

export const GamesList = ({ games }: GameListProps) => {
  const [filteredGames, setFilteredGames] = useState(games);

  const filter = (selected: string) => {
    switch (selected) {
      case 'theory':
        setFilteredGames(games.filter((game) => game.type === 'theory'));
        break;
      case 'listen':
        setFilteredGames(games.filter((game) => game.type === 'listen'));
        break;
      default:
        setFilteredGames(games);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Tabs defaultValue="all" onValueChange={(selected) => filter(selected)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="listen">Listen</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="xl:container xs:max-w-full grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        {filteredGames.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
};
