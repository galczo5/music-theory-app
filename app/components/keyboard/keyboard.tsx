import { Note, notesArray } from '~/music/notes';

type KeyboardProps = {
  onNoteClick?: (note: Note) => void;
  selectedNote?: Note;
};

export const Keyboard = ({ onNoteClick, selectedNote }: KeyboardProps) => {
  const notes = notesArray.filter((x) => !x.includes('#'));

  const noteColor = (note: Note) => {
    if (note === selectedNote) return 'bg-primary text-white border-black';
    if (note.includes('#')) return 'bg-black text-white border-black hover:bg-gray-900';
    return 'bg-white text-black hover:bg-gray-100';
  };

  return (
    <div className="relative w-96 h-40 text-xs">
      {/* White keys */}
      <div className="flex absolute top-0 left-0">
        {notes.map((x) => (
          <div
            onClick={() => onNoteClick && onNoteClick(x)}
            className={noteColor(x) + ' pb-4 w-12 h-40 border flex items-end justify-center rounded cursor-pointer'}
          >
            {x}
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
                onClick={() => onNoteClick && onNoteClick(x)}
                className={noteColor(x) + ' pb-2 w-6 h-24 flex items-end justify-center rounded cursor-pointer'}
              >
                {x}
              </div>
            );
          }

          if (isNextSharp) {
            return <div className="pb-4 w-6"></div>;
          }

          return <div className="pb-4 w-12"></div>;
        })}
      </div>
    </div>
  );
};
