import React, {useMemo, useState} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {AppButton} from '../components/Buttons';
import {InfoCard} from '../components/Cards';
import {Header} from '../components/Header';
import {Body, Eyebrow, Title} from '../components/Typography';
import {categories, shopTexts} from '../data/content';
import {getCategory} from '../data/selectors';
import {colors} from '../theme/colors';
import {actionBarBottom} from '../theme/metrics';
import {CategoryId, TextItem} from '../types/app';
import {ScreenProps} from '../types/screenProps';

type Mode = 'categories' | 'list' | 'preview';

export function ShopScreen({state, updateState}: ScreenProps): React.JSX.Element {
  const [mode, setMode] = useState<Mode>('categories');
  const [categoryId, setCategoryId] = useState<CategoryId>('temple');
  const [selectedText, setSelectedText] = useState<TextItem | null>(null);
  const category = getCategory(categoryId);
  const categoryTexts = useMemo(() => shopTexts.filter(text => text.categoryId === categoryId), [categoryId]);

  const buy = (text: TextItem) => {
    const price = text.price ?? 0;
    if (state.purchasedTextIds.includes(text.id)) {
      return;
    }
    if (state.sacredBooks < price) {
      Alert.alert('Not enough Sacred Books', 'Complete quizzes to earn more books.');
      return;
    }
    updateState(current => ({
      ...current,
      sacredBooks: current.sacredBooks - price,
      purchasedTextIds: [...current.purchasedTextIds, text.id],
    }));
    setMode('list');
  };

  const balance = (
    <View style={styles.balance}>
      <Text style={styles.balanceText}>📕 {state.sacredBooks}</Text>
    </View>
  );

  if (mode === 'preview' && selectedText) {
    const owned = state.purchasedTextIds.includes(selectedText.id);
    return (
      <AppScreen padded={false}>
        <View style={styles.previewHeader}>
          <Pressable onPress={() => setMode('list')} style={styles.round}>
            <Text style={styles.roundText}>‹</Text>
          </Pressable>
          {balance}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.previewContent}>
          <Eyebrow>{category.icon} {category.title} · Preview</Eyebrow>
          <Title style={styles.previewTitle}>{selectedText.title}</Title>
          <Body style={styles.previewBody}>{selectedText.body}</Body>
        </ScrollView>
        <View style={styles.buyBar}>
          <AppButton onPress={() => buy(selectedText)} disabled={owned} variant={owned ? 'ghost' : 'primary'}>
            {owned ? '✓ In Your Library' : `▣  Buy for ${selectedText.price} Sacred Books`}
          </AppButton>
        </View>
      </AppScreen>
    );
  }

  if (mode === 'list') {
    return (
      <AppScreen>
        <Header icon={category.icon} title={category.title} onBack={() => setMode('categories')} right={balance} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {categoryTexts.map(text => {
            const owned = state.purchasedTextIds.includes(text.id);
            return (
              <View key={text.id} style={[styles.shopCard, owned && styles.ownedCard]}>
                <Pressable
                  onPress={() => {
                    setSelectedText(text);
                    setMode('preview');
                  }}
                  style={styles.shopPreview}>
                  <View style={styles.shopIcon}>
                    <Text style={styles.shopIconText}>{category.icon}</Text>
                  </View>
                  <View style={styles.shopText}>
                    <Text style={styles.shopTitle} numberOfLines={2}>
                      {text.title}
                    </Text>
                    <Text style={styles.shopSubtitle} numberOfLines={2}>
                      {text.body}
                    </Text>
                    <Text style={styles.tapPreview}>› Tap to preview</Text>
                  </View>
                </Pressable>
                <View style={styles.buyRow}>
                  {owned ? (
                    <Text style={styles.owned}>✓ In Your Library</Text>
                  ) : (
                    <Text style={styles.price}>▣ {text.price} Sacred Books</Text>
                  )}
                  <Pressable onPress={() => buy(text)} disabled={owned} style={[styles.buySmall, owned && styles.buySmallDisabled]}>
                    <Text style={styles.buySmallText}>{owned ? 'Owned' : 'Buy'}</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Header eyebrow="Exchange" title="Sacred Text Shop" subtitle="Exchange Sacred Books for exclusive ancient texts" right={balance} />
      <View style={styles.hint}>
        <Text style={styles.hintTitle}>💡 How to earn more books</Text>
        <Body>Complete quizzes to earn Sacred Books. Each correct answer rewards you with 3 books. Purchased texts unlock in the Prompter and Workshop.</Body>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(item => {
          const count = shopTexts.filter(text => text.categoryId === item.id).length;
          return (
            <InfoCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={`${count} exclusive texts available`}
              meta={`${Math.min(...shopTexts.filter(text => text.categoryId === item.id).map(text => text.price ?? 0))}+`}
              tone={item.tone}
              onPress={() => {
                setCategoryId(item.id);
                setMode('list');
              }}
            />
          );
        })}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  balance: {
    minWidth: 70,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  balanceText: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  hint: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginTop: 18,
    marginBottom: 20,
  },
  hintTitle: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10,
  },
  shopCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: 16,
    overflow: 'hidden',
  },
  ownedCard: {
    borderColor: colors.green,
  },
  shopPreview: {
    minHeight: 116,
    flexDirection: 'row',
    padding: 16,
  },
  shopIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelSoft,
    marginRight: 14,
  },
  shopIconText: {
    fontSize: 25,
  },
  shopText: {
    flex: 1,
  },
  shopTitle: {
    color: colors.textBright,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  shopSubtitle: {
    color: colors.dim,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  tapPreview: {
    color: colors.dim,
    fontSize: 12,
    marginTop: 11,
  },
  buyRow: {
    minHeight: 58,
    borderTopWidth: 1,
    borderColor: 'rgba(122, 67, 38, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  price: {
    color: colors.orange,
    fontSize: 14,
    fontWeight: '900',
  },
  owned: {
    color: colors.green,
    fontSize: 14,
    fontWeight: '900',
  },
  buySmall: {
    minWidth: 76,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    paddingHorizontal: 14,
  },
  buySmallDisabled: {
    opacity: 0.35,
  },
  buySmallText: {
    color: colors.textBright,
    fontSize: 13,
    fontWeight: '900',
  },
  previewHeader: {
    height: 86,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.border,
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
  roundText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 30,
  },
  previewContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 140,
  },
  previewTitle: {
    marginTop: 6,
    marginBottom: 22,
  },
  previewBody: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 30,
  },
  buyBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: actionBarBottom,
  },
});
