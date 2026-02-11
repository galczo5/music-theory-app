import type { Scale } from '~/types/scale';
import { scaleNotes } from '~/music/scale';
import { Card, CardContent } from '~/components/ui/card';
import { Dot } from 'lucide-react';

type GameScaleNotesProps = {
  scale: Scale;
};

export const GameScaleNotes = ({ scale }: GameScaleNotesProps) => {
  const notes = scaleNotes(scale);
  return (
    <div className="flex items-center text-center">
      <Card>
        <CardContent className="flex items-center font-bold text-3xl">
          {notes.map((note, index) => (
            <span key={index} className="flex items-center">
              {note}
              {index !== notes.length - 1 && <Dot />}
            </span>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
