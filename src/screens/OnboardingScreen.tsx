import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {ImageSourcePropType} from 'react-native';
import {images} from '../assets/images';
import {AppButton} from '../components/Buttons';
import {Body, Eyebrow, Title} from '../components/Typography';
import {colors} from '../theme/colors';
import {platformTopInset} from '../theme/metrics';

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
  tone: 'gold' | 'orange';
};

const slides: Slide[] = [
  {
    eyebrow: 'A message from professor Amun',
    title: 'Greetings, Seeker',
    image: images.professorGreeting,
    tone: 'gold',
    text: 'I am Professor Amun Ra-Hotep. Near Luxor, I found a preserved book with the lost voice secrets of ancient Egypt’s greatest speakers.',
  },
  {
    eyebrow: 'Secrets of ancient Egypt',
    title: 'The Sacred Book',
    image: images.professorSacredBook,
    tone: 'orange',
    text: 'This sacred book holds lessons in voice, diction, breathing, and confidence once used by priests, pharaohs, and royal commanders.',
  },
  {
    eyebrow: 'Like the ancient priests',
    title: 'Train Your Voice',
    image: images.professorVoiceTraining,
    tone: 'orange',
    text: 'Read Egyptian texts aloud with the Voice Prompter. Choose a category, set your pace, and train diction, rhythm, and projection.',
  },
  {
    eyebrow: 'Stories, tips and knowledge',
    title: 'Ancient Wisdom',
    image: images.professorAncientWisdom,
    tone: 'gold',
    text: 'Explore ancient stories, daily voice tips, and quiz challenges. Earn Sacred Books and unlock new texts for practice.',
  },
  {
    eyebrow: 'The pharaoh awaits',
    title: 'Your Journey Begins',
    image: images.professorJourney,
    tone: 'orange',
    text: 'The sacred scrolls are open. Train your voice, speak with calm power, and begin your journey into Egyptian oratory.',
  },
];

type Props = {
  onFinish: () => void;
};

export function OnboardingScreen({onFinish}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const {height} = useWindowDimensions();
  const compact = height <= 700;
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const next = () => {
    if (isLast) {
      onFinish();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.stage}>
        <Pressable style={[styles.skip, compact && styles.skipCompact]} onPress={onFinish}>
          <Text style={styles.skipText}>SKIP</Text>
        </Pressable>
        <Image source={slide.image} resizeMode="contain" style={[styles.person, compact && styles.personCompact]} />
        <View style={[styles.copy, compact && styles.copyCompact]}>
          <Eyebrow style={{color: slide.tone === 'gold' ? colors.gold : colors.orange}} numberOfLines={1}>
            {slide.eyebrow}
          </Eyebrow>
          <Title style={[styles.title, compact ? styles.titleCompact : undefined]} numberOfLines={1}>
            {slide.title}
          </Title>
          <View style={[styles.divider, compact && styles.dividerCompact]}>
            <View style={[styles.line, {backgroundColor: slide.tone === 'gold' ? colors.goldSoft : colors.orange}]} />
            <View style={[styles.diamond, {backgroundColor: slide.tone === 'gold' ? colors.gold : colors.orange}]} />
            <View style={[styles.line, {backgroundColor: slide.tone === 'gold' ? colors.goldSoft : colors.orange}]} />
          </View>
          <View style={[styles.panel, compact && styles.panelCompact]}>
            <Body style={[styles.body, compact ? styles.bodyCompact : undefined]} numberOfLines={compact ? 4 : 5}>
              {slide.text}
            </Body>
          </View>
        </View>
        <View style={[styles.footer, compact && styles.footerCompact]}>
          <View style={[styles.dots, compact && styles.dotsCompact]}>
            {slides.map((item, slideIndex) => (
              <View
                key={item.title}
                style={[
                  styles.dot,
                  index === slideIndex && styles.activeDot,
                  index === slideIndex && item.tone === 'gold' && styles.activeGoldDot,
                  index === slideIndex && item.tone === 'orange' && styles.activeOrangeDot,
                ]}
              />
            ))}
          </View>
          <AppButton variant={slide.tone === 'gold' ? 'gold' : 'primary'} onPress={next}>
            {isLast ? 'Begin Your Journey' : 'Continue  ›'}
          </AppButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  stage: {
    flex: 1,
  },
  skip: {
    position: 'absolute',
    top: platformTopInset + 18,
    right: 26,
    zIndex: 4,
  },
  skipCompact: {
    top: platformTopInset + 8,
  },
  skipText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  person: {
    position: 'absolute',
    top: platformTopInset + 30,
    left: 0,
    right: 0,
    alignSelf: 'center',
    width: '92%',
    height: '50%',
  },
  personCompact: {
    top: platformTopInset + 18,
    height: '43%',
    width: '86%',
  },
  copy: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 128,
  },
  copyCompact: {
    left: 20,
    right: 20,
    bottom: 112,
  },
  title: {
    marginTop: 4,
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 29,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  dividerCompact: {
    marginTop: 8,
    marginBottom: 14,
  },
  line: {
    height: 2,
    width: 38,
  },
  diamond: {
    width: 8,
    height: 8,
    transform: [{rotate: '45deg'}],
    marginHorizontal: 10,
  },
  panel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: 'rgba(38, 16, 7, 0.68)',
    padding: 18,
    marginBottom: 12,
    minHeight: 104,
    justifyContent: 'center',
  },
  panelCompact: {
    padding: 14,
    marginBottom: 18,
    minHeight: 100,
  },
  body: {
    color: colors.text,
  },
  bodyCompact: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 34,
  },
  footerCompact: {
    left: 20,
    right: 20,
    bottom: 20,
  },
  dots: {
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  dotsCompact: {
    marginBottom: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dim,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  activeGoldDot: {
    backgroundColor: colors.gold,
  },
  activeOrangeDot: {
    backgroundColor: colors.orange,
  },
});
