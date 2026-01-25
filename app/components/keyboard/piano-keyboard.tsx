import { Note, notesArray } from '~/music/notes';
import { useContext, useState } from 'react';
import { PlayerContext } from '~/components/midi-player/player';
import { useSettings } from '~/components/settings/settingsContext';
import { StoredSettings } from '~/config/storedSettings';

type KeyboardProps = {
  onNoteClick?: (note: Note) => void;
  selectedNote?: Note | Note[];
  play?: boolean;
  disabled?: boolean;
};

export const PianoKeyboard = ({ onNoteClick, selectedNote, play, disabled }: KeyboardProps) => {
  const notes = notesArray.filter((x) => !x.includes('#'));
  const player = useContext(PlayerContext);
  const settings = useSettings();
  const [pianoLabels] = useState(settings.get(StoredSettings.pianoLabelsEnabled));

  const noteColor = (note: Note) => {
    const selected = Array.isArray(selectedNote) ? selectedNote : [selectedNote];
    const isFirst = Note.C === note;
    const isLast = Note.B === note;
    const rounding = isFirst ? 'rounded-l-xl' : isLast ? 'rounded-r-xl' : '';

    if (selected.includes(note)) return `bg-primary text-white border-black ${rounding}`;
    if (note.includes('#')) return 'bg-black text-white border-black hover:bg-gray-900';

    return `bg-white text-black hover:bg-gray-100 border dark:border-black ${rounding}`;
  };

  const playNote = (note: Note) => {
    if (play) {
      player.playNote(note);
    }

    onNoteClick && onNoteClick(note);
  };

  const disabledStyle = disabled ? 'select-none opacity-20' : '';

  return (
    <div className={disabledStyle + ' relative w-84 h-40 text-xs shadow-sm rounded-xl'}>
      {/* White keys */}
      <div className="flex absolute top-0 left-0">
        {notes.map((x) => (
          <div
            key={x}
            onClick={() => playNote(x)}
            className={noteColor(x) + ' pb-4 w-12 h-40 flex items-end justify-center cursor-pointer'}
          >
            {pianoLabels && x}
          </div>
        ))}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 flex pl-3">
        {notesArray.map((x, i) => {
          const isSharp = x.includes('#');
          const isNextSharp = notesArray.at(i + 1)?.includes('#');

          if (isSharp) {
            return (
              <div
                key={x}
                onClick={() => playNote(x)}
                className={
                  noteColor(x) + ' rounded-b shadow pb-2 w-6 h-24 flex items-end justify-center cursor-pointer'
                }
              >
                {pianoLabels && x}
              </div>
            );
          }

          if (isNextSharp) {
            return <div key={x} className="pb-4 w-6"></div>;
          }

          return <div key={x} className="pb-4 w-12"></div>;
        })}
      </div>
    </div>
  );
};
