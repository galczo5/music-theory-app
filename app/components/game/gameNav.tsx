import { Library, Speaker, X } from 'lucide-react';
import { TypographyH3 } from '~/components/ui/typography';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { usePlayer } from '~/components/midi-player/player';

export const GameNav = () => {
  const navigate = useNavigate();
  const player = usePlayer();
  return (
    <div className="p-4 w-full flex justify-between items-center border-b">
      <div className="gap-2 items-center hidden md:flex cursor-pointer" onClick={() => navigate('/play')}>
        <Library />
        <TypographyH3>Music Theory App</TypographyH3>
      </div>
      <div className="gap-2 items-center md:hidden flex">
        <Button variant="outline">
          <Library />
          Music Theory App
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" className="cursor-pointer" onClick={() => player.testSound()}>
          <Speaker />
          Test sound
        </Button>
        <Button variant="outline" className="cursor-pointer" onClick={() => navigate('/play')}>
          <X />
          <span className="hidden md:inline">End game</span>
        </Button>
      </div>
    </div>
  );
};
