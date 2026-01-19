import type { Result } from '~/types/game';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { Card, CardContent } from '~/components/ui/card';
import { Undo } from 'lucide-react';
import { useNavigate } from 'react-router';

type GameSummaryProps = {
  results: Result[];
};

export const GameSummary = ({ results }: GameSummaryProps) => {
  const navigate = useNavigate();
  const correct = results.filter((r) => r.result);
  const avg = results.map((r) => r.time).reduce((a, b) => a + b) / results.length;
  const avgTime = Math.round(avg / 100) / 10;
  const percentage = Math.round((correct.length / results.length) * 1000) / 10;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Carousel className="w-1/4 md:w-96 max-w-2/3 md:max-w-96 text-center">
        <CarouselContent>
          <CarouselItem>
            <Card className="bg-primary text-white">
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
          <CarouselItem>
            <Card>
              <CardContent
                onClick={() => navigate('/play')}
                className="flex flex-col h-60 items-center justify-center cursor-pointer"
              >
                <Undo size={75} />
                <div className="text-lg font-semibold">Go back</div>
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
