import {StoredAppState} from './app';

export type ScreenProps = {
  state: StoredAppState;
  updateState: (producer: (current: StoredAppState) => StoredAppState) => void;
};
