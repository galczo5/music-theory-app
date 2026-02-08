import { Note, notesArray } from '~/music/notes';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { Forward } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import { Card, CardContent } from '~/components/ui/card';
import { getScale, type ScaleType } from '~/music/scale';
import type { Scale } from '~/types/scale';

type KeyboardProps = {
  onSelect?: (chord: Scale) => void;
  types?: ScaleType[];
};

export const ScalesKeyboard = ({ onSelect, types }: KeyboardProps) => {
  const [note, setNote] = useState<Note | undefined>();
  const [type, setType] = useState<ScaleType | undefined>();

  const notes = [...notesArray];
  const typeOptions: Array<ScaleType> = types || [
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian'
  ];

  const onClick = () => {
    if (!note || !type) {
      return;
    }

    onSelect && onSelect(getScale(note, type));
  };

  const clear = () => {
    setNote(undefined);
    setType(undefined);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-center flex-wrap gap-2">
          {notes.map((n) => (
            <Button onClick={() => setNote(n)} variant={note === n ? 'default' : 'outline'}>
              {n}
            </Button>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardContent>
        <div className="flex justify-center flex-wrap gap-2">
          {typeOptions.map((t) => (
            <Button onClick={() => setType(t)} variant={type === t ? 'default' : 'outline'}>
              {t}
            </Button>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardContent>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" disabled={!note && !type} onClick={clear}>
            Clear
          </Button>
          <Button disabled={!note || !type} onClick={onClick}>
            Confirm
            <Forward />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
