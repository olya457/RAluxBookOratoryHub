import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoredAppState} from '../types/app';

const storageKey = 'oratoryHubStateV1';

export const defaultStoredState: StoredAppState = {
  onboardingDone: false,
  customTexts: [],
  favouriteStoryIds: [],
  sacredBooks: 27,
  purchasedTextIds: [],
};

export async function loadStoredState(): Promise<StoredAppState> {
  const raw = await AsyncStorage.getItem(storageKey);
  if (!raw) {
    return defaultStoredState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredAppState>;
    return {
      ...defaultStoredState,
      ...parsed,
      customTexts: parsed.customTexts ?? [],
      favouriteStoryIds: parsed.favouriteStoryIds ?? [],
      purchasedTextIds: parsed.purchasedTextIds ?? [],
    };
  } catch {
    return defaultStoredState;
  }
}

export async function saveStoredState(state: StoredAppState): Promise<void> {
  await AsyncStorage.setItem(storageKey, JSON.stringify(state));
}
