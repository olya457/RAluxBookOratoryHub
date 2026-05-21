import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {AppButton} from '../components/Buttons';
import {Body, Eyebrow, Title} from '../components/Typography';
import {quizQuestions} from '../data/content';
import {colors} from '../theme/colors';
import {actionBarBottom} from '../theme/metrics';
import {QuizQuestion} from '../types/app';
import {ScreenProps} from '../types/screenProps';

type AnswerRecord = {
  question: QuizQuestion;
  selectedIndex: number | null;
};

type Stage = 'intro' | 'active' | 'result';

function pickQuestions(): QuizQuestion[] {
  return [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
}

export function QuizScreen({state, updateState}: ScreenProps): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('intro');
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [time, setTime] = useState(15);

  const start = () => {
    setSessionQuestions(pickQuestions());
    setIndex(0);
    setSelectedIndex(null);
    setConfirmed(false);
    setAnswers([]);
    setTime(15);
    setStage('active');
  };

  const question = sessionQuestions[index];
  const correctCount = useMemo(
    () => answers.filter(answer => answer.selectedIndex === answer.question.correctIndex).length,
    [answers],
  );

  useEffect(() => {
    if (stage !== 'active' || confirmed) {
      return;
    }
    const timer = setInterval(() => {
      setTime(value => {
        if (value <= 1) {
          clearInterval(timer);
          setConfirmed(true);
          setAnswers(current => [...current, {question, selectedIndex: null}]);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [confirmed, question, stage]);

  const confirm = () => {
    if (selectedIndex === null || confirmed) {
      return;
    }
    setConfirmed(true);
    setAnswers(current => [...current, {question, selectedIndex}]);
  };

  const next = () => {
    if (index === sessionQuestions.length - 1) {
      const reward = correctCount * 3;
      updateState(current => ({
        ...current,
        sacredBooks: current.sacredBooks + reward,
      }));
      setStage('result');
      return;
    }
    setIndex(value => value + 1);
    setSelectedIndex(null);
    setConfirmed(false);
    setTime(15);
  };

  const shareResult = () => {
    Share.share({
      title: 'Egyptian Oratory Quiz',
      message: `I scored ${correctCount}/5 in Egyptian Oratory Quiz and earned ${correctCount * 3} Sacred Books.`,
    });
  };

  if (stage === 'active' && question) {
    return (
      <AppScreen>
        <View style={styles.quizTop}>
          <Text style={styles.questionMeta}>Question {index + 1} of {sessionQuestions.length}</Text>
          <Text style={styles.timer}>⏱ {time}</Text>
        </View>
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, {width: `${((index + 1) / sessionQuestions.length) * 100}%`}]} />
        </View>
        <View style={styles.questionCard}>
          <Eyebrow>Q{index + 1}</Eyebrow>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        <View style={styles.answers}>
          {question.answers.map((answer, answerIndex) => {
            const selected = selectedIndex === answerIndex;
            const isCorrect = answerIndex === question.correctIndex;
            const isWrong = confirmed && selected && !isCorrect;
            return (
              <Pressable
                key={answer}
                disabled={confirmed}
                onPress={() => setSelectedIndex(answerIndex)}
                style={[
                  styles.answer,
                  selected && styles.answerSelected,
                  confirmed && isCorrect && styles.answerCorrect,
                  isWrong && styles.answerWrong,
                ]}>
                <Text style={styles.answerLetter}>{String.fromCharCode(65 + answerIndex)}</Text>
                <Text style={[styles.answerText, confirmed && isCorrect && styles.answerCorrectText]}>{answer}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.bottomAction}>
          <AppButton onPress={confirmed ? next : confirm} disabled={!confirmed && selectedIndex === null}>
            {confirmed ? (index === sessionQuestions.length - 1 ? 'Result' : 'Next question') : 'Confirm Answer'}
          </AppButton>
        </View>
      </AppScreen>
    );
  }

  if (stage === 'result') {
    const percent = Math.round((correctCount / 5) * 100);
    return (
      <AppScreen>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultContent}>
          <View style={styles.resultIcon}>
            <Text style={styles.resultEmoji}>🌅</Text>
          </View>
          <Eyebrow style={styles.resultEyebrow}>Seeker</Eyebrow>
          <Title style={styles.resultTitle}>{correctCount} / 5 Correct</Title>
          <View style={styles.ring}>
            <Text style={styles.ringText}>{percent}%</Text>
          </View>
          <View style={styles.rewardBox}>
            <Eyebrow>Sacred Books Earned</Eyebrow>
            <Text style={styles.reward}>📕 +{correctCount * 3}</Text>
            <Body>{correctCount} correct × 3 books added to your library balance.</Body>
          </View>
          <View style={styles.breakdown}>
            <Eyebrow>Answer Breakdown</Eyebrow>
            {answers.map(answer => {
              const correct = answer.selectedIndex === answer.question.correctIndex;
              return (
                <Text key={answer.question.id} style={[styles.breakdownText, correct ? styles.breakdownGood : styles.breakdownBad]} numberOfLines={2}>
                  {correct ? '✓' : '×'} {answer.question.question}
                </Text>
              );
            })}
          </View>
          <AppButton onPress={shareResult}>Share</AppButton>
          <AppButton variant="ghost" onPress={() => setStage('intro')} style={styles.backButton}>
            Back
          </AppButton>
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.intro}>
        <View style={styles.brain}>
          <Text style={styles.brainText}>🧠</Text>
        </View>
        <Eyebrow style={styles.challenge}>Challenge</Eyebrow>
        <Title style={styles.introTitle}>Egyptian Oratory Quiz</Title>
        <Body style={styles.introBody}>Test your knowledge of ancient Egyptian diction and oratory techniques</Body>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>❔</Text>
            <Text style={styles.infoStrong}>5</Text>
            <Text style={styles.infoText}>Questions</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>⏱</Text>
            <Text style={styles.infoStrong}>15s</Text>
            <Text style={styles.infoText}>each</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>📚</Text>
            <Text style={styles.infoStrong}>3</Text>
            <Text style={styles.infoText}>books/correct</Text>
          </View>
        </View>
        <View style={styles.how}>
          <Eyebrow>How it works</Eyebrow>
          <Body style={styles.howText}>◆ Answer 4 multiple-choice questions and the final challenge</Body>
          <Body style={styles.howText}>◆ Each question has a 15-second timer</Body>
          <Body style={styles.howText}>◆ Earn Sacred Books for every correct answer</Body>
          <Body style={styles.howText}>◆ Spend books in the Text Shop</Body>
        </View>
        <View style={styles.balance}>
          <Text style={styles.balanceText}>📕 Sacred Books: {state.sacredBooks}</Text>
        </View>
        <AppButton onPress={start}>Start the Quiz  ›</AppButton>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    minHeight: '100%',
    justifyContent: 'center',
  },
  brain: {
    alignSelf: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },
  brainText: {
    fontSize: 40,
  },
  challenge: {
    alignSelf: 'center',
    backgroundColor: colors.cardGold,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    color: colors.gold,
  },
  introTitle: {
    textAlign: 'center',
    marginTop: 14,
  },
  introBody: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 26,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    minHeight: 74,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    fontSize: 18,
  },
  infoStrong: {
    color: colors.orange,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 3,
  },
  infoText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  how: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginTop: 18,
    marginBottom: 18,
  },
  howText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  balance: {
    alignItems: 'center',
    marginBottom: 14,
  },
  balanceText: {
    color: colors.gold,
    fontWeight: '900',
  },
  quizTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
  },
  questionMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  timer: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
  },
  progressOuter: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.panel,
    marginTop: 10,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressInner: {
    height: 5,
    backgroundColor: colors.orange,
  },
  questionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    minHeight: 112,
    marginBottom: 18,
  },
  questionText: {
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 22,
    marginTop: 10,
  },
  answers: {
    gap: 12,
  },
  answer: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  answerSelected: {
    borderColor: colors.orange,
    backgroundColor: colors.cardSoft,
  },
  answerCorrect: {
    borderColor: colors.green,
    backgroundColor: '#07340e',
  },
  answerWrong: {
    borderColor: colors.red,
    backgroundColor: '#350706',
  },
  answerLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.cardSoft,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 12,
    fontWeight: '900',
    marginRight: 10,
  },
  answerText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  answerCorrectText: {
    color: '#8fff9b',
  },
  bottomAction: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: actionBarBottom,
  },
  resultContent: {
    minHeight: '100%',
    justifyContent: 'center',
  },
  resultIcon: {
    alignSelf: 'center',
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardSoft,
    marginBottom: 12,
  },
  resultEmoji: {
    fontSize: 36,
  },
  resultEyebrow: {
    alignSelf: 'center',
    color: colors.red,
  },
  resultTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  ring: {
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 8,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  ringText: {
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '900',
  },
  rewardBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGold,
    backgroundColor: colors.cardGold,
    padding: 16,
    marginBottom: 16,
  },
  reward: {
    color: colors.gold,
    fontSize: 26,
    fontWeight: '900',
    marginVertical: 4,
  },
  breakdown: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 18,
  },
  breakdownText: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
    marginTop: 8,
  },
  breakdownGood: {
    color: colors.green,
  },
  breakdownBad: {
    color: colors.red,
  },
  backButton: {
    marginTop: 12,
  },
});
