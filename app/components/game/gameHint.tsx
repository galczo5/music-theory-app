import { Badge } from '~/components/ui/badge';
import { X } from 'lucide-react';

type GameHintProps = {
  hint: string;
};

export const GameHint = ({ hint }: GameHintProps) => {
  return (
    <div className="p-4">
      <Badge>
        {hint}
        <X />
      </Badge>
    </div>
  );
};
