import { type Interval, intervalArray } from '~/music/interval';
import { Button } from '~/components/ui/button';

type IntervalsKeyboardProps = {
  onIntervalClick: (interval: Interval) => void;
  randomize?: boolean;
};

export const IntervalsKeyboard = ({ onIntervalClick, randomize }: IntervalsKeyboardProps) => {
  const randomArray = [...intervalArray];

  if (randomize) {
    randomArray.sort(() => 0.5 - Math.random());
  }

  return (
    <div className="flex gap-3 justify-center flex-wrap md:max-w-2/3">
      {randomArray.map((i) => (
        <Button size="sm" variant="outline" key={i} onClick={() => onIntervalClick(i)}>
          {i}
        </Button>
      ))}
    </div>
  );
};
