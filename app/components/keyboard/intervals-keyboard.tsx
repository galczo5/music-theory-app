import { type Interval, intervalArray } from '~/music/interval';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

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
    <Card className="md:max-w-2/3">
      <CardContent className="flex gap-2 justify-center flex-wrap">
        {randomArray.map((i) => (
          <Button size="sm" variant="outline" key={i} onClick={() => onIntervalClick(i)}>
            {i}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
