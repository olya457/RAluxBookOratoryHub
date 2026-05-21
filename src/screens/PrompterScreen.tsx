import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {AppButton} from '../components/Buttons';
import {InfoCard} from '../components/Cards';
import {Header} from '../components/Header';
import {Body, Eyebrow, Title, serifFont} from '../components/Typography';
import {categories} from '../data/content';
import {getCategory, getLibraryTexts} from '../data/selectors';
import {colors} from '../theme/colors';
import {floatingNavTop} from '../theme/metrics';
import {CategoryId, TextItem} from '../types/app';
import {ScreenProps} from '../types/screenProps';

type Stage = 'category' | 'setup' | 'reading' | 'complete';
type Speed = 'Slow' | 'Medium' | 'Fast';
type TextSize = 'Small' | 'Medium' | 'Large';

const speedAmount: Record<Speed, number> = {
  Slow: 1,
  Medium: 2,
  Fast: 3,
};

const textSizeAmount: Record<TextSize, number> = {
  Small: 17,
  Medium: 20,
  Large: 24,
};

export function PrompterScreen({state}: ScreenProps): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('category');
  const [categoryId, setCategoryId] = useState<CategoryId>('temple');
  const [speed, setSpeed] = useState<Speed>('Medium');
  const [textSize, setTextSize] = useState<TextSize>('Medium');
  const [playing, setPlaying] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const yRef = useRef(0);
  const category = getCategory(categoryId);
  const texts = useMemo(() => getLibraryTexts(state, categoryId), [categoryId, state]);
  const activeText: TextItem = texts[0];

  useEffect(() => {
    if (stage !== 'reading' || !playing) {
      return;
    }
    const timer = setInterval(() => {
      yRef.current += speedAmount[speed];
      scrollRef.current?.scrollTo({y: yRef.current, animated: false});
    }, 70);
    return () => clearInterval(timer);
  }, [playing, speed, stage]);

  const beginReading = () => {
    yRef.current = 0;
    setPlaying(true);
    setStage('reading');
  };

  const shareSession = () => {
    Share.share({
      title: activeText.title,
      message: `${activeText.title}\n\n${activeText.body.slice(0, 420)}`,
    });
  };

  if (stage === 'setup') {
    return (
      <AppScreen>
        <Header icon={category.icon} title="Set Difficulty" eyebrow="Step 2 of 3" onBack={() => setStage('category')} />
        <InfoCard icon={category.icon} title={category.title} subtitle={activeText.title} tone={category.tone} selected />
        <SettingGroup title="⚡ Scroll Speed" values={['Slow', 'Medium', 'Fast']} active={speed} onChange={value => setSpeed(value as Speed)} />
        <SettingGroup title="T  Text Size" values={['Small', 'Medium', 'Large']} active={textSize} onChange={value => setTextSize(value as TextSize)} />
        <View style={styles.preview}>
          <Eyebrow>Preview</Eyebrow>
          <Body style={[styles.previewText, {fontSize: textSizeAmount[textSize] - 4}]} numberOfLines={3}>
            {activeText.body}
          </Body>
        </View>
        <AppButton onPress={beginReading}>▶  Begin Reading</AppButton>
      </AppScreen>
    );
  }

  if (stage === 'reading') {
    return (
      <AppScreen padded={false}>
        <View style={styles.readerHeader}>
          <Pressable onPress={() => setStage('setup')} style={styles.readerBack}>
            <Text style={styles.backText}>‹ Exit</Text>
          </Pressable>
          <Eyebrow style={styles.readerCategory}>
            {category.icon} {category.title}
          </Eyebrow>
        </View>
        <ScrollView ref={scrollRef} style={styles.readerScroll} contentContainerStyle={styles.readerContent} showsVerticalScrollIndicator={false}>
          <Title style={styles.readerTitle}>{activeText.title}</Title>
          <Text style={[styles.readerText, {fontSize: textSizeAmount[textSize], lineHeight: textSizeAmount[textSize] + 14}]}>
            {activeText.body}
          </Text>
        </ScrollView>
        <View style={styles.readerControls}>
          <Pressable onPress={() => scrollRef.current?.scrollTo({y: 0, animated: true})} style={styles.controlButton}>
            <Text style={styles.controlIcon}>↺</Text>
          </Pressable>
          <Pressable onPress={() => setPlaying(value => !value)} style={[styles.controlButton, styles.playButton]}>
            <Text style={styles.playIcon}>{playing ? 'Ⅱ' : '▶'}</Text>
          </Pressable>
          <Pressable onPress={() => setStage('complete')} style={styles.controlButton}>
            <Text style={styles.controlIcon}>✓</Text>
          </Pressable>
        </View>
        <Text style={styles.status}>{playing ? 'READING' : 'PAUSED'}</Text>
      </AppScreen>
    );
  }

  if (stage === 'complete') {
    return (
      <AppScreen>
        <View style={styles.complete}>
          <View style={styles.trophy}>
            <Text style={styles.trophyText}>🏆</Text>
          </View>
          <Title style={styles.completeTitle}>Session Complete!</Title>
          <Body style={styles.completeText}>You read the sacred text to completion. Your voice grows stronger with each practice.</Body>
          <InfoCard icon={category.icon} title={category.title} subtitle={activeText.title} tone={category.tone} selected right={<Text style={styles.stars}>★ ★ ★</Text>} />
          <AppButton onPress={shareSession}>Share</AppButton>
          <AppButton variant="ghost" onPress={() => setStage('category')} style={styles.secondaryAction}>
            Choose Another Text
          </AppButton>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Header eyebrow="Practice" title="Prompter" />
      <Eyebrow style={styles.step}>Step 1 of 3</Eyebrow>
      <Title style={styles.sectionTitle}>Choose Category</Title>
      <View style={styles.smallDivider} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(item => {
          const count = getLibraryTexts(state, item.id).length;
          return (
            <InfoCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={`${count} texts available`}
              tone={item.tone}
              onPress={() => {
                setCategoryId(item.id);
                setStage('setup');
              }}
            />
          );
        })}
      </ScrollView>
    </AppScreen>
  );
}

type SettingGroupProps = {
  title: string;
  values: string[];
  active: string;
  onChange: (value: string) => void;
};

function SettingGroup({title, values, active, onChange}: SettingGroupProps): React.JSX.Element {
  return (
    <View style={styles.settingGroup}>
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.segmented}>
        {values.map(value => (
          <Pressable key={value} onPress={() => onChange(value)} style={[styles.segment, active === value && styles.segmentActive]}>
            <Text style={[styles.segmentText, active === value && styles.segmentTextActive]}>{value}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    marginTop: 8,
  },
  sectionTitle: {
    marginTop: 4,
    marginBottom: 6,
    fontSize: 24,
  },
  smallDivider: {
    width: 82,
    height: 2,
    backgroundColor: colors.orange,
    marginBottom: 22,
  },
  settingGroup: {
    marginBottom: 24,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  segmented: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    borderColor: colors.orange,
    backgroundColor: colors.cardSoft,
  },
  segmentText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
  },
  segmentTextActive: {
    color: colors.orange,
  },
  preview: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSoft,
    borderRadius: 12,
    padding: 16,
    minHeight: 142,
    marginBottom: 18,
  },
  previewText: {
    marginTop: 10,
  },
  readerHeader: {
    height: 72,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  readerBack: {
    marginRight: 16,
  },
  backText: {
    color: colors.muted,
    fontSize: 14,
  },
  readerCategory: {
    flex: 1,
  },
  readerScroll: {
    flex: 1,
  },
  readerContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 180,
  },
  readerTitle: {
    color: colors.gold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 18,
  },
  readerText: {
    color: colors.text,
    fontFamily: serifFont,
    fontWeight: '600',
  },
  readerControls: {
    position: 'absolute',
    bottom: floatingNavTop + 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  controlButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  controlIcon: {
    color: colors.muted,
    fontSize: 22,
  },
  playIcon: {
    color: colors.textBright,
    fontSize: 24,
    fontWeight: '900',
  },
  status: {
    position: 'absolute',
    bottom: floatingNavTop + 4,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.dim,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  complete: {
    flex: 1,
    justifyContent: 'center',
  },
  trophy: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  trophyText: {
    fontSize: 45,
  },
  completeTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  completeText: {
    textAlign: 'center',
    marginBottom: 22,
  },
  stars: {
    color: colors.gold,
    fontSize: 19,
    fontWeight: '900',
  },
  secondaryAction: {
    marginTop: 14,
  },
});
