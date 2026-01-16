import { TypographyH1, TypographyP } from '~/components/ui/typography';
import { Button } from '~/components/ui/button';
import { ArrowRight, Library } from 'lucide-react';
import { Separator } from '~/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto text-center">
      <Library size={150} className="mb-3" />
      <TypographyH1>Music Theory App</TypographyH1>
      <TypographyP>Music theory training for guitarists and all musicians.</TypographyP>
      <div className="w-96 my-6">
        <Separator />
      </div>
      <Button variant="default">
        Continue to the app <ArrowRight />
      </Button>
    </div>
  );
}
