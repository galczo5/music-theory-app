import { Badge } from '~/components/ui/badge';
import { X } from 'lucide-react';
import { useSettings } from '~/components/settings/settingsContext';
import { StoredSettings } from '~/config/storedSettings';
import { useState } from 'react';

type GameHintProps = {
  hint: string;
};

export const GameHint = ({ hint }: GameHintProps) => {
  const settings = useSettings();
  const [disabled, setDisabled] = useState(!settings.get(StoredSettings.hintsEnabled));

  const disable = () => {
    settings.set(StoredSettings.hintsEnabled, false);
    setDisabled(true);
  };

  return (
    <>
      {!disabled && (
        <div className="p-4">
          <Badge>
            {hint}
            <span className="cursor-pointer" onClick={() => disable()}>
              <X size={14} />
            </span>
          </Badge>
        </div>
      )}
    </>
  );
};
