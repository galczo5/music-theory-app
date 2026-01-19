import { Note, notesArray } from '~/music/notes';
import type { Chord } from '~/types/chord';
import { Button } from '~/components/ui/button';
import { type ChordType, getChord } from '~/music/chord';
import { useState } from 'react';
import { Forward } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import { Card, CardContent } from '~/components/ui/card';

type KeyboardProps = {
  onSelect?: (chord: Chord) => void;
  types?: ChordType[];
};

export const ChordKeyboard = ({ onSelect, types }: KeyboardProps) => {
  const [note, setNote] = useState<Note | undefined>();
  const [type, setType] = useState<ChordType | undefined>();

  const notes = [...notesArray];
  const typeOptions: Array<ChordType> = types || [
    'Major',
    'Minor',
    'Augmented',
    'Diminished',
    'Major 7',
    'Minor 7',
    'Major 9',
    'Minor 9'
  ];

  const onClick = () => {
    if (!note || !type) {
      return;
    }

    onSelect && onSelect(getChord(note, type));
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
