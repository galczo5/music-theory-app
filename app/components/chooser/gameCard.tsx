import { type Game, getGameIcon } from '~/types/game';
import { useNavigate } from 'react-router';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '~/components/ui/item';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

type GameCardProp = {
  game: Game;
};

export const GameCard = ({ game }: GameCardProp) => {
  const navigate = useNavigate();
  const disabledStyle = game.disabled ? 'grayscale select-none' : '';
  return (
    <Item variant="outline" className={disabledStyle}>
      <ItemMedia variant="icon">{getGameIcon(game)}</ItemMedia>
      <ItemContent>
        <ItemTitle>{game.name}</ItemTitle>
        <ItemDescription>{game.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {game.disabled && <span>Available soon</span>}
        {!game.disabled && (
          <Button onClick={() => navigate(game.path)}>
            Play
            <ArrowRight />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
};
