import { Note, notesArray } from '~/music/notes';

type KeyboardProps = {
  onNoteClick?: (note: Note) => void;
};

export const Keyboard = ({ onNoteClick }: KeyboardProps) => {
  const notes = notesArray.filter((x) => !x.includes('#'));
  return (
    <div className="relative">
      {/* White keys */}
      <div className="flex absolute top-0 left-0">
        {notes.map((x) => (
          <div
            onClick={() => onNoteClick && onNoteClick(x)}
            className="pb-4 w-16 h-40 border flex items-end justify-center bg-white rounded cursor-pointer"
          >
            {x}
          </div>
        ))}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 flex pl-4">
        {notesArray.map((x, i) => {
          const isSharp = x.includes('#');
          const isNextSharp = notesArray.at(i + 1)?.includes('#');

          if (isSharp) {
            return (
              <div
                onClick={() => onNoteClick && onNoteClick(x)}
                className="pb-4 w-8 h-24 flex items-end justify-center bg-black text-white rounded cursor-pointer"
              >
                {x}
              </div>
            );
          }

          if (isNextSharp) {
            return <div className="pb-4 w-8"></div>;
          }

          return <div className="pb-4 w-16"></div>;
        })}
      </div>
    </div>
  );
};
