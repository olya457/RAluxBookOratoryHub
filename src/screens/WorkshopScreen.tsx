import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {InfoCard} from '../components/Cards';
import {Header} from '../components/Header';
import {Body, Eyebrow} from '../components/Typography';
import {categories} from '../data/content';
import {getCategory, getLibraryTexts} from '../data/selectors';
import {colors} from '../theme/colors';
import {floatingNavTop} from '../theme/metrics';
import {CategoryId, CustomText, TextItem} from '../types/app';
import {ScreenProps} from '../types/screenProps';

type Mode = 'categories' | 'list' | 'form';
type ActiveField = 'title' | 'body';
type TextSelection = {
  start: number;
  end: number;
};

type KeyboardMode = 'letters' | 'symbols';

const customKeyboardHeight = 194;
const letterRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
  ['mode', ',', 'space', '.', 'enter', 'done'],
];
const symbolRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
  ['mode', '.', ',', '?', '!', "'", 'backspace'],
  ['space', 'enter', 'done'],
];

export function WorkshopScreen({state, updateState}: ScreenProps): React.JSX.Element {
  const [mode, setMode] = useState<Mode>('categories');
  const [categoryId, setCategoryId] = useState<CategoryId>('temple');
  const [editingText, setEditingText] = useState<TextItem | null>(null);
  const category = getCategory(categoryId);
  const texts = useMemo(() => getLibraryTexts(state, categoryId), [categoryId, state]);

  const openCategory = (id: CategoryId) => {
    setCategoryId(id);
    setMode('list');
  };

  const openNew = () => {
    setEditingText(null);
    setMode('form');
  };

  const openEdit = (text: TextItem) => {
    if (!text.custom) {
      return;
    }
    setEditingText(text);
    setMode('form');
  };

  const deleteText = (text: TextItem) => {
    if (!text.custom) {
      return;
    }
    Alert.alert('Delete text?', 'This saved text will be removed from your library.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          updateState(current => ({
            ...current,
            customTexts: current.customTexts.filter(item => item.id !== text.id),
          }));
        },
      },
    ]);
  };

  if (mode === 'form') {
    const initialCustom = editingText?.custom === true ? (editingText as CustomText) : null;
    return (
      <TextForm
        categoryId={categoryId}
        initial={initialCustom}
        onBack={() => setMode('list')}
        onSave={text => {
          updateState(current => {
            const existing = current.customTexts.some(item => item.id === text.id);
            return {
              ...current,
              customTexts: existing ? current.customTexts.map(item => (item.id === text.id ? text : item)) : [...current.customTexts, text],
            };
          });
          setMode('list');
        }}
      />
    );
  }

  if (mode === 'list') {
    return (
      <AppScreen>
        <Header icon={category.icon} title={category.title} onBack={() => setMode('categories')} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {texts.map(text => (
            <View key={text.id} style={styles.textCard}>
              <View style={styles.textRow}>
                <Text style={styles.smallIcon}>📖</Text>
                <View style={styles.textContent}>
                  <Text style={styles.textTitle} numberOfLines={2}>
                    {text.title}
                  </Text>
                  <Text style={styles.textPreview} numberOfLines={2}>
                    {text.body}
                  </Text>
                </View>
                {text.custom ? <Text style={styles.customBadge}>Custom</Text> : null}
              </View>
              {text.custom ? (
                <View style={styles.actions}>
                  <Pressable onPress={() => openEdit(text)} style={styles.pill}>
                    <Text style={styles.pillText}>✎ Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => deleteText(text)} style={styles.pill}>
                    <Text style={styles.pillText}>🗑 Delete</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          ))}
          <Pressable onPress={openNew} style={styles.addBox}>
            <Text style={styles.addText}>＋ Add Your Own Text</Text>
          </Pressable>
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Header eyebrow="Manage" title="Text Workshop" subtitle="Edit, add, and manage your sacred texts" />
      <View style={styles.libraryBox}>
        <Text style={styles.libraryIcon}>📝</Text>
        <View style={styles.libraryText}>
          <Text style={styles.libraryTitle}>Your Personal Library</Text>
          <Body>Add your own texts to any category. Use them in the Prompter for practice.</Body>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(item => (
          <InfoCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={`${getLibraryTexts(state, item.id).length} texts`}
            tone={item.tone}
            onPress={() => openCategory(item.id)}
          />
        ))}
      </ScrollView>
    </AppScreen>
  );
}

type TextFormProps = {
  categoryId: CategoryId;
  initial: CustomText | null;
  onBack: () => void;
  onSave: (text: CustomText) => void;
};

function TextForm({categoryId, initial, onBack, onSave}: TextFormProps): React.JSX.Element {
  const category = getCategory(categoryId);
  const titleRef = useRef<TextInput>(null);
  const bodyRef = useRef<TextInput>(null);
  const [title, setTitle] = useState(initial?.title ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [activeField, setActiveField] = useState<ActiveField>('title');
  const [titleSelection, setTitleSelection] = useState<TextSelection>({start: title.length, end: title.length});
  const [bodySelection, setBodySelection] = useState<TextSelection>({start: body.length, end: body.length});
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [keyboardMode, setKeyboardMode] = useState<KeyboardMode>('letters');
  const [shifted, setShifted] = useState(true);
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  useEffect(() => {
    requestAnimationFrame(() => titleRef.current?.focus());
  }, []);

  const focusField = (field: ActiveField) => {
    setActiveField(field);
    setKeyboardVisible(true);
    requestAnimationFrame(() => {
      if (field === 'title') {
        titleRef.current?.focus();
        return;
      }
      bodyRef.current?.focus();
    });
  };

  const replaceRange = (value: string, selection: TextSelection, key: string) => {
    const next = value.slice(0, selection.start) + key + value.slice(selection.end);
    const cursor = selection.start + key.length;
    return {next, selection: {start: cursor, end: cursor}};
  };

  const removeRange = (value: string, selection: TextSelection) => {
    if (selection.start !== selection.end) {
      const next = value.slice(0, selection.start) + value.slice(selection.end);
      return {next, selection: {start: selection.start, end: selection.start}};
    }
    if (selection.start === 0) {
      return {next: value, selection};
    }
    const cursor = selection.start - 1;
    const next = value.slice(0, cursor) + value.slice(selection.end);
    return {next, selection: {start: cursor, end: cursor}};
  };

  const keepActiveFocus = () => {
    requestAnimationFrame(() => {
      if (activeField === 'title') {
        titleRef.current?.focus();
        return;
      }
      bodyRef.current?.focus();
    });
  };

  const insertText = (key: string) => {
    if (activeField === 'title') {
      const result = replaceRange(title, titleSelection, key);
      setTitle(result.next);
      setTitleSelection(result.selection);
      keepActiveFocus();
      return;
    }
    const result = replaceRange(body, bodySelection, key);
    setBody(result.next);
    setBodySelection(result.selection);
    keepActiveFocus();
  };

  const backspace = () => {
    if (activeField === 'title') {
      const result = removeRange(title, titleSelection);
      setTitle(result.next);
      setTitleSelection(result.selection);
      keepActiveFocus();
      return;
    }
    const result = removeRange(body, bodySelection);
    setBody(result.next);
    setBodySelection(result.selection);
    keepActiveFocus();
  };

  const pressKeyboardKey = (key: string) => {
    if (key === 'shift') {
      setShifted(current => !current);
      return;
    }
    if (key === 'mode') {
      setKeyboardMode(current => (current === 'letters' ? 'symbols' : 'letters'));
      return;
    }
    if (key === 'backspace') {
      backspace();
      return;
    }
    if (key === 'space') {
      insertText(' ');
      return;
    }
    if (key === 'enter') {
      if (activeField === 'title') {
        focusField('body');
        return;
      }
      insertText('\n');
      return;
    }
    if (key === 'done') {
      setKeyboardVisible(false);
      titleRef.current?.blur();
      bodyRef.current?.blur();
      return;
    }
    insertText(keyboardMode === 'letters' && shifted ? key.toUpperCase() : key);
    if (keyboardMode === 'letters' && shifted) {
      setShifted(false);
    }
  };

  const save = () => {
    if (!canSave) {
      return;
    }
    onSave({
      id: initial?.id ?? `custom-${Date.now()}`,
      categoryId,
      title: title.trim(),
      body: body.trim(),
      custom: true,
    });
  };

  return (
    <View style={styles.formRoot}>
      <AppScreen>
        <Header
          title={initial ? 'Edit Text' : 'Add Text'}
          onBack={onBack}
          right={
            <Pressable onPress={save} disabled={!canSave} style={[styles.saveButton, !canSave && styles.saveDisabled]}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          }
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={keyboardVisible && styles.formContentWithKeyboard}>
          <Eyebrow>Text title *</Eyebrow>
          <TextInput
            ref={titleRef}
            value={title}
            onChangeText={setTitle}
            onFocus={() => {
              setActiveField('title');
              setKeyboardVisible(true);
            }}
            onSelectionChange={event => setTitleSelection(event.nativeEvent.selection)}
            placeholder="Enter a title..."
            placeholderTextColor={colors.dim}
            keyboardAppearance="dark"
            returnKeyType="next"
            selection={titleSelection}
            showSoftInputOnFocus={false}
            style={[styles.input, activeField === 'title' && keyboardVisible && styles.inputActive]}
          />
          <Eyebrow style={styles.fieldLabel}>Text content *</Eyebrow>
          <TextInput
            ref={bodyRef}
            value={body}
            onChangeText={setBody}
            onFocus={() => {
              setActiveField('body');
              setKeyboardVisible(true);
            }}
            onSelectionChange={event => setBodySelection(event.nativeEvent.selection)}
            placeholder="Enter your speech text here..."
            placeholderTextColor={colors.dim}
            multiline
            keyboardAppearance="dark"
            selection={bodySelection}
            showSoftInputOnFocus={false}
            textAlignVertical="top"
            style={[styles.input, styles.textArea, activeField === 'body' && keyboardVisible && styles.inputActive]}
          />
          <View style={styles.categoryNotice}>
            <Text style={styles.noticeText}>
              {category.icon} This text will appear in the <Text style={styles.noticeStrong}>{category.title}</Text> category
            </Text>
          </View>
        </ScrollView>
        {keyboardVisible ? (
          <CompactKeyboard
            mode={keyboardMode}
            shifted={shifted}
            onPressKey={pressKeyboardKey}
          />
        ) : null}
      </AppScreen>
    </View>
  );
}

type CompactKeyboardProps = {
  mode: KeyboardMode;
  shifted: boolean;
  onPressKey: (key: string) => void;
};

function CompactKeyboard({mode, shifted, onPressKey}: CompactKeyboardProps): React.JSX.Element {
  const rows = mode === 'letters' ? letterRows : symbolRows;

  return (
    <View style={styles.customKeyboard}>
      {rows.map((row, rowIndex) => (
        <View key={String(rowIndex)} style={styles.keyboardRow}>
          {row.map(key => (
            <Pressable key={key} onPress={() => onPressKey(key)} style={[styles.keyboardKey, key === 'space' && styles.keyboardSpace, key === 'done' && styles.keyboardDone, key === 'shift' && shifted && styles.keyboardKeyActive]}>
              <Text style={[styles.keyboardKeyText, key === 'done' && styles.keyboardDoneText]}>
                {formatKeyboardLabel(key, mode, shifted)}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

function formatKeyboardLabel(key: string, mode: KeyboardMode, shifted: boolean): string {
  if (key === 'shift') {
    return '⇧';
  }
  if (key === 'backspace') {
    return '⌫';
  }
  if (key === 'mode') {
    return mode === 'letters' ? '123' : 'ABC';
  }
  if (key === 'space') {
    return 'Space';
  }
  if (key === 'enter') {
    return '↵';
  }
  if (key === 'done') {
    return 'Done';
  }
  return mode === 'letters' && shifted ? key.toUpperCase() : key;
}

const styles = StyleSheet.create({
  libraryBox: {
    minHeight: 94,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 26,
    marginBottom: 34,
  },
  libraryIcon: {
    fontSize: 27,
    marginRight: 14,
  },
  libraryText: {
    flex: 1,
  },
  libraryTitle: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  textCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    marginBottom: 14,
    overflow: 'hidden',
  },
  textRow: {
    minHeight: 92,
    flexDirection: 'row',
    padding: 16,
  },
  smallIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  textTitle: {
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  textPreview: {
    color: colors.dim,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  customBadge: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 8,
  },
  actions: {
    borderTopWidth: 1,
    borderColor: 'rgba(122, 67, 38, 0.22)',
    flexDirection: 'row',
    padding: 12,
    gap: 10,
  },
  pill: {
    height: 34,
    borderRadius: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelSoft,
  },
  pillText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  addBox: {
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  addText: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: '900',
  },
  formRoot: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  formContentWithKeyboard: {
    paddingBottom: customKeyboardHeight + 26,
  },
  saveButton: {
    minWidth: 70,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    paddingHorizontal: 16,
  },
  saveDisabled: {
    opacity: 0.35,
  },
  saveText: {
    color: colors.textBright,
    fontSize: 14,
    fontWeight: '900',
  },
  fieldLabel: {
    marginTop: 20,
  },
  input: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 14,
    marginTop: 10,
  },
  inputActive: {
    borderColor: colors.orange,
  },
  textArea: {
    height: 258,
    paddingTop: 14,
    lineHeight: 22,
  },
  categoryNotice: {
    borderRadius: 12,
    backgroundColor: colors.cardGold,
    padding: 14,
    marginTop: 20,
  },
  noticeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  noticeStrong: {
    color: colors.orange,
  },
  customKeyboard: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: floatingNavTop + 8,
    minHeight: customKeyboardHeight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.overlay,
    padding: 8,
    gap: 6,
    zIndex: 8,
  },
  keyboardRow: {
    flexDirection: 'row',
    gap: 5,
  },
  keyboardKey: {
    flex: 1,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardKeyActive: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.orange,
  },
  keyboardSpace: {
    flex: 3.5,
  },
  keyboardKeyText: {
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '900',
  },
  keyboardDone: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
    flex: 1.5,
  },
  keyboardDoneText: {
    color: colors.textBright,
    fontSize: 13,
    fontWeight: '900',
  },
});
