import { Library, X } from 'lucide-react';
import { TypographyH3 } from '~/components/ui/typography';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';

export const GameNav = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 w-full flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Library />
        <TypographyH3>Music Theory App</TypographyH3>
      </div>
      <Button variant="outline" className="cursor-pointer" onClick={() => navigate('/play')}>
        <X />
        End game
      </Button>
    </div>
  );
};
