import { Note, notesArray } from '~/music/notes';
import type { Chord } from '~/types/chord';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { type ChordType, getChord } from '~/music/chord';
import { useState } from 'react';

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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center flex-wrap gap-2">
        {notes.map((n) => (
          <Button onClick={() => setNote(n)} variant={note === n ? 'default' : 'outline'}>
            {n}
          </Button>
        ))}
      </div>
      <Separator />
      <div className="flex justify-center flex-wrap gap-2">
        {typeOptions.map((t) => (
          <Button onClick={() => setType(t)} variant={type === t ? 'default' : 'outline'}>
            {t}
          </Button>
        ))}
      </div>
      <Separator />
      <Button disabled={!note || !type} onClick={onClick}>
        Select
      </Button>
    </div>
  );
};
