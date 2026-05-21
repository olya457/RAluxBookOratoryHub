import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {InfoCard} from '../components/Cards';
import {Header} from '../components/Header';
import {Body} from '../components/Typography';
import {tipCategories} from '../data/content';
import {colors} from '../theme/colors';
import {Tip, TipCategory} from '../types/app';

type Selection = {
  category: TipCategory;
  tip?: Tip;
};

export function TipsScreen(): React.JSX.Element {
  const [selection, setSelection] = useState<Selection | null>(null);
  const allTips = useMemo(() => tipCategories.flatMap(category => category.tips.map(tip => ({category, tip}))), []);

  const randomTip = () => {
    const picked = allTips[Math.floor(Math.random() * allTips.length)];
    setSelection({category: picked.category, tip: picked.tip});
  };

  if (selection?.tip) {
    return (
      <AppScreen>
        <Header
          icon={selection.category.icon}
          title={selection.tip.title}
          eyebrow={selection.category.title}
          onBack={() => setSelection({category: selection.category})}
          right={
            <Pressable
              onPress={() =>
                Share.share({
                  title: selection.tip?.title,
                  message: `${selection.tip?.title}\n\n${selection.tip?.body}`,
                })
              }
              style={styles.headerPill}>
              <Text style={styles.headerPillText}>⌯</Text>
            </Pressable>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tipBody}>
            <Body style={styles.tipBodyText}>{selection.tip.body}</Body>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>
              ⏱ <Text style={styles.noteStrong}>Daily practice note:</Text> Egyptian teachers valued consistency over intensity. One clear session every morning builds the strongest habit.
            </Text>
          </View>
        </ScrollView>
      </AppScreen>
    );
  }

  if (selection?.category) {
    return (
      <AppScreen>
        <Header icon={selection.category.icon} title={selection.category.title} subtitle={selection.category.subtitle} onBack={() => setSelection(null)} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {selection.category.tips.map(tip => (
            <InfoCard
              key={tip.id}
              icon={selection.category.icon}
              title={tip.title}
              subtitle={tip.body}
              tone="orange"
              onPress={() => setSelection({category: selection.category, tip})}
            />
          ))}
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Header eyebrow="Master your voice" title="Ancient Tips" subtitle="Wisdom from Egypt’s greatest masters of speech" />
      <Pressable onPress={randomTip} style={styles.random}>
        <Text style={styles.randomText}>🔀 Random Ancient Tip</Text>
      </Pressable>
      <View style={styles.stats}>
        {tipCategories.map(category => (
          <View key={category.id} style={styles.statBox}>
            <Text style={styles.statIcon}>{category.icon}</Text>
            <Text style={styles.statNumber}>{category.tips.length}</Text>
            <Text style={styles.statLabel}>tips</Text>
          </View>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tipCategories.map((category, index) => (
          <InfoCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            subtitle={`${category.subtitle}\n${category.tips.length} techniques`}
            tone={index === 1 ? 'gold' : 'orange'}
            onPress={() => setSelection({category})}
          />
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  random: {
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  randomText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    minHeight: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 22,
  },
  statNumber: {
    color: colors.orange,
    fontWeight: '900',
    fontSize: 15,
    marginTop: 3,
  },
  statLabel: {
    color: colors.dim,
    fontSize: 11,
    marginTop: 2,
  },
  tipBody: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 18,
    marginTop: 18,
  },
  tipBodyText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 31,
  },
  note: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    padding: 16,
    marginTop: 22,
  },
  noteText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
  },
  noteStrong: {
    color: colors.gold,
    fontWeight: '900',
  },
  headerPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerPillText: {
    color: colors.orange,
    fontSize: 18,
  },
});
