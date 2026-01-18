import { TypographyH1, TypographyP } from '~/components/ui/typography';
import { Button } from '~/components/ui/button';
import { AlertCircleIcon, ArrowRight, Code, Library } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Keyboard } from '~/components/keyboard/keyboard';
import { Separator } from '~/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

export default function Home() {
  const navigate = useNavigate();

  const navigateToGitHub = () => {
    window.open('https://github.com/galczo5/music-theory-app', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <div className="text-left">
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Open Beta</AlertTitle>
          <AlertDescription>
            This application is currently in open beta. Please report any issues or feedback via our GitHub repository.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex flex-col items-center justify-center grow">
        <div className="text-primary flex gap-2 items-center justify-center">
          <Library className="hidden sm:inline" size={40} />
          <TypographyH1>Music Theory App</TypographyH1>
        </div>
        <TypographyP>Music theory training for guitarists and all musicians.</TypographyP>
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" onClick={navigateToGitHub}>
            <Code />
            GitHub
          </Button>
          <Button onClick={() => navigate('/play')}>
            Open app <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="w-full mb-8">
        <Separator />
      </div>

      <Keyboard play={true} />
    </div>
  );
}
