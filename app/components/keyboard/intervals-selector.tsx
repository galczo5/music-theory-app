import { type Interval, intervalArray } from '~/music/interval';
import { Button } from '~/components/ui/button';

type IntervalsSelectorProps = {
  onIntervalClick: (interval: Interval) => void;
};

export const IntervalsSelector = ({ onIntervalClick }: IntervalsSelectorProps) => {
  const randomArray = [...intervalArray];
  randomArray.sort(() => 0.5 - Math.random());
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
