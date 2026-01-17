import { Github, Library } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TypographyH1 } from '~/components/ui/typography';
import { GamesList } from '~/components/chooser/gamesList';
import { GAMES } from '~/config/games';
import { Button } from '~/components/ui/button';

export default function () {
  return (
    <>
      <div className="flex flex-col p-6">
        <div className="flex justify-between items-center pb-6">
          <div className="flex items-center gap-3">
            <Library size={50} />
            <TypographyH1>Music Theory App</TypographyH1>
          </div>
          <div>
            <Button variant="outline">
              <Github />
              Check out in GitHub
            </Button>
          </div>
        </div>
        <Tabs defaultValue="games">
          <TabsList>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="stats">Your progress</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="games">
            <GamesList games={GAMES} />
          </TabsContent>
          <TabsContent value="settigns"></TabsContent>
        </Tabs>
      </div>
    </>
  );
}
