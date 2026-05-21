import React, {useState} from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Header} from '../components/Header';
import {Body, Eyebrow, Title} from '../components/Typography';
import {stories} from '../data/content';
import {colors} from '../theme/colors';
import {Story} from '../types/app';
import {ScreenProps} from '../types/screenProps';

export function HistoryScreen({state, updateState}: ScreenProps): React.JSX.Element {
  const [selected, setSelected] = useState<Story | null>(null);
  const favourites = new Set(state.favouriteStoryIds);

  const toggleFavourite = (id: string) => {
    updateState(current => {
      const exists = current.favouriteStoryIds.includes(id);
      return {
        ...current,
        favouriteStoryIds: exists ? current.favouriteStoryIds.filter(item => item !== id) : [...current.favouriteStoryIds, id],
      };
    });
  };

  const shareStory = (story: Story) => {
    Share.share({
      title: story.title,
      message: `${story.title}\n\n${story.subtitle}\n\n${story.body.slice(0, 500)}`,
    });
  };

  if (selected) {
    const active = favourites.has(selected.id);
    return (
      <AppScreen padded={false}>
        <View style={styles.detailHeader}>
          <Pressable onPress={() => setSelected(null)} style={styles.round}>
            <Text style={styles.roundText}>‹</Text>
          </Pressable>
          <View style={styles.detailActions}>
            <Pressable onPress={() => toggleFavourite(selected.id)} style={[styles.round, active && styles.roundActive]}>
              <Text style={styles.actionText}>{active ? '♥' : '♡'}</Text>
            </Pressable>
            <Pressable onPress={() => shareStory(selected)} style={styles.round}>
              <Text style={styles.actionText}>⌯</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
          <Eyebrow style={styles.goldPill}>Ancient Record</Eyebrow>
          <Title>{selected.title}</Title>
          <View style={styles.quote}>
            <Text style={styles.quoteText}>"{selected.subtitle}"</Text>
          </View>
          <Body style={styles.storyBody}>{selected.body}</Body>
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Header eyebrow="Ancient Records" title="History Vault" subtitle="True stories of Egypt’s greatest orators" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {stories.map((story, index) => {
          const active = favourites.has(story.id);
          return (
            <View key={story.id} style={[styles.storyCard, active && styles.favouriteCard]}>
              <Pressable onPress={() => setSelected(story)} style={styles.storyPress}>
                <Eyebrow style={active ? styles.favLabel : styles.storyIndex}>{active ? '♥ Favourite' : `Story ${String(index + 1).padStart(2, '0')}`}</Eyebrow>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {story.title}
                </Text>
                <Text style={styles.cardText} numberOfLines={2}>
                  {story.subtitle}
                </Text>
                <Text style={styles.readMeta}>📖 Read story      ⌯ {47 + index * 19}</Text>
              </Pressable>
              <View style={styles.cardActions}>
                <Pressable onPress={() => toggleFavourite(story.id)} style={[styles.iconCircle, active && styles.iconActive]}>
                  <Text style={styles.iconText}>{active ? '♥' : '♡'}</Text>
                </Pressable>
                <Pressable onPress={() => shareStory(story)} style={styles.iconCircle}>
                  <Text style={styles.iconText}>⌯</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
  },
  storyCard: {
    minHeight: 170,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: 16,
    overflow: 'hidden',
  },
  favouriteCard: {
    borderColor: colors.orange,
  },
  storyPress: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  storyIndex: {
    color: colors.dim,
  },
  favLabel: {
    color: colors.orange,
  },
  cardTitle: {
    color: colors.textBright,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 26,
  },
  cardText: {
    color: colors.dim,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    marginTop: 7,
  },
  readMeta: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 12,
  },
  cardActions: {
    position: 'absolute',
    right: 14,
    top: 16,
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelSoft,
  },
  iconActive: {
    backgroundColor: colors.cardSoft,
  },
  iconText: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: '900',
  },
  detailHeader: {
    height: 88,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roundActive: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.orange,
  },
  roundText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 30,
  },
  actionText: {
    color: colors.orange,
    fontSize: 20,
    fontWeight: '900',
  },
  detailActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 130,
  },
  goldPill: {
    alignSelf: 'flex-start',
    color: colors.gold,
    backgroundColor: colors.cardGold,
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 14,
  },
  quote: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    padding: 16,
    marginTop: 22,
    marginBottom: 24,
  },
  quoteText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    fontStyle: 'italic',
    lineHeight: 23,
  },
  storyBody: {
    color: colors.text,
    lineHeight: 26,
  },
});
