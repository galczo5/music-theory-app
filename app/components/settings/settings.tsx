import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useSettings } from '~/components/settings/settingsContext';
import { StoredSettings } from '~/config/storedSettings';
import { useState } from 'react';

export const Settings = () => {
  const settings = useSettings();
  const [data, setData] = useState(settings.getAll());

  const set = (key: StoredSettings, value: boolean) => {
    settings.set(key, value);
    setData(settings.getAll());
  };

  return (
    <div className="flex flex-col gap-3 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="hints"
              checked={data[StoredSettings.hintsEnabled]}
              onCheckedChange={(checked) => set(StoredSettings.hintsEnabled, checked)}
            />
            <Label htmlFor="hints">Hints enabled</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="infinite"
              checked={data[StoredSettings.infiniteModeEnabled]}
              onCheckedChange={(checked) => set(StoredSettings.infiniteModeEnabled, checked)}
            />
            <Label htmlFor="infinite">Game has 50 rounds</Label>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Piano</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="piano"
              checked={data[StoredSettings.pianoLabelsEnabled]}
              onCheckedChange={(checked) => set(StoredSettings.pianoLabelsEnabled, checked)}
            />
            <Label htmlFor="piano">Piano labels enabled</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="octave"
              checked={data[StoredSettings.octaveUpEnabled]}
              onCheckedChange={(checked) => set(StoredSettings.octaveUpEnabled, checked)}
            />
            <Label htmlFor="octave">Piano octave up</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
