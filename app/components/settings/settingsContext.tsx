import { createContext, useContext } from 'react';
import { StoredSettings } from '~/config/storedSettings';

type SettingsContextType = {
  corrupted: boolean;
  clear: () => void;
  getAll: () => Record<StoredSettings, boolean>;
  get: (key: StoredSettings) => boolean;
  set: (key: StoredSettings, value: boolean) => void;
};

const DEFAULT: Record<StoredSettings, boolean> = {
  [StoredSettings.hintsEnabled]: true,
  [StoredSettings.history]: true,
  [StoredSettings.infiniteModeEnabled]: false,
  [StoredSettings.octaveUpEnabled]: false,
  [StoredSettings.pianoLabelsEnabled]: true
};

const defaultSettingsContext = (): SettingsContextType => {
  let corrupted = true;

  let data = { ...DEFAULT };

  try {
    const storedValue = localStorage.getItem('storedSettings') || JSON.stringify({});
    let data = { ...DEFAULT, ...JSON.parse(storedValue) };
    corrupted = false;

    return {
      corrupted,
      getAll: () => data,
      clear: () => {
        data = { ...DEFAULT };
        localStorage.removeItem('storedSettings');
        corrupted = false;
      },
      set: (key, value) => {
        data = { ...data, [key]: value };
        localStorage.setItem('storedSettings', JSON.stringify(data));
      },
      get: (key: StoredSettings) => data[key]
    };
  } catch (e) {
    console.error(e);
  }

  return {
    corrupted,
    getAll: () => DEFAULT,
    clear: () => {
      data = { ...DEFAULT };
      localStorage.removeItem('storedSettings');
      corrupted = false;
    },
    get: () => false,
    set: () => {}
  };
};

export const getStoredSetting = (setting: StoredSettings) => {
  const storedValue = JSON.parse(localStorage.getItem('storedSettings') || JSON.stringify({})) as any;
  return !!storedValue[setting];
};

export const DefaultSettingsContext = defaultSettingsContext();
export const SettingsContext = createContext(DefaultSettingsContext);

export const useSettings = () => {
  return useContext(SettingsContext);
};
