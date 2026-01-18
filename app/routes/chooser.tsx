import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { GamesList } from '~/components/chooser/gamesList';
import { GAMES } from '~/config/games';
import { ChooserHeader } from '~/components/chooser/chooserHeader';

export default function () {
  return (
    <div className="flex flex-col p-6">
      <ChooserHeader />
      <Tabs defaultValue="games">
        <TabsList>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="handbook">Handbook</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="games">
          <GamesList games={GAMES} />
        </TabsContent>
        <TabsContent value="settigns"></TabsContent>
      </Tabs>
    </div>
  );
}
