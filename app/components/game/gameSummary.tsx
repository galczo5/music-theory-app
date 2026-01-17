import type { Result } from '~/types/game';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { Card, CardContent } from '~/components/ui/card';

type GameSummaryProps = {
  results: Result[];
};

export const GameSummary = ({ results }: GameSummaryProps) => {
  const correct = results.filter((r) => r.result);
  const avg = results.map((r) => r.time).reduce((a, b) => a + b) / results.length;
  const avgTime = Math.round(avg / 100) / 10;
  const percentage = Math.round((correct.length / results.length) * 1000) / 10;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Carousel className="w-full max-w-96">
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col h-60 items-center justify-center">
                <div className="text-6xl font-semibold">{percentage}%</div>
                <div className="text-lg font-semibold">Success rate</div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col h-60 items-center justify-center">
                <div className="text-6xl font-semibold">{correct.length}</div>
                <div className="text-lg font-semibold">Correct answers</div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col h-60 items-center justify-center">
                <div className="text-6xl font-semibold">{results.length - correct.length}</div>
                <div className="text-lg font-semibold">Mistakes</div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col h-60 items-center justify-center">
                <div className="text-6xl font-semibold">{avgTime}s</div>
                <div className="text-lg font-semibold">Average answer time</div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
