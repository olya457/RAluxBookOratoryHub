import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {HistoryScreen} from '../screens/HistoryScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PrompterScreen} from '../screens/PrompterScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {ShopScreen} from '../screens/ShopScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {TipsScreen} from '../screens/TipsScreen';
import {WorkshopScreen} from '../screens/WorkshopScreen';
import {defaultStoredState, loadStoredState, saveStoredState} from '../storage/appStorage';
import {colors} from '../theme/colors';
import {MainTab, StoredAppState} from '../types/app';

function RootNavigator(): React.JSX.Element {
  const [storedState, setStoredState] = useState<StoredAppState>(defaultStoredState);
  const [loaded, setLoaded] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [tab, setTab] = useState<MainTab>('prompter');

  useEffect(() => {
    loadStoredState()
      .then(value => {
        setStoredState(value);
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const updateState = useCallback((producer: (current: StoredAppState) => StoredAppState) => {
    setStoredState(current => {
      const next = producer(current);
      saveStoredState(next);
      return next;
    });
  }, []);

  const finishOnboarding = () => {
    updateState(current => ({
      ...current,
      onboardingDone: true,
    }));
  };

  if (!loaded || !splashDone) {
    return <SplashScreen />;
  }

  if (!storedState.onboardingDone) {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {tab === 'prompter' ? <PrompterScreen state={storedState} updateState={updateState} /> : null}
        {tab === 'workshop' ? <WorkshopScreen state={storedState} updateState={updateState} /> : null}
        {tab === 'history' ? <HistoryScreen state={storedState} updateState={updateState} /> : null}
        {tab === 'tips' ? <TipsScreen /> : null}
        {tab === 'quiz' ? <QuizScreen state={storedState} updateState={updateState} /> : null}
        {tab === 'shop' ? <ShopScreen state={storedState} updateState={updateState} /> : null}
      </View>
      <FloatingTabBar active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
  },
});

export default RootNavigator;
