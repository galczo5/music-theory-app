import type { Scale } from '~/types/scale';
import { scaleName } from '~/music/scale';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

type GameScaleProps = {
  scale: Scale;
};

export const GameScale = ({ scale }: GameScaleProps) => {
  const root = scale[0];
  const name = scaleName(scale);

  return (
    <div className="flex items-center gap-6 p-4 text-center">
      <Card className="min-w-48 px-6">
        <CardHeader>
          <span className="text-primary pt-2 text-6xl font-bold">{root}</span>
        </CardHeader>
        <Separator />
        <CardContent>
          <span className="font-bold text-xl">{name.replace(`${root} `, '')}</span>
        </CardContent>
      </Card>
    </div>
  );
};
