import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../src/theme';
import * as Speech from 'expo-speech';

const steps = [
  { label: 'Breathing reset', seconds: 60 },
  { label: 'Push-ups or incline push-ups', seconds: 120 },
  { label: 'Bodyweight squats', seconds: 120 },
  { label: 'Brisk walk or march', seconds: 120 },
];

export default function MicroSession() {
  const { colors, spacing, typography, roundness } = useTheme();
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(steps[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      Speech.speak(steps[index].label);
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
            if (index < steps.length - 1) {
              setIndex((i) => i + 1);
              setRemaining(steps[index + 1].seconds);
              setRunning(true);
            } else {
              setRunning(false);
            }
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    };
  }, [running, index]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2), justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '700', textAlign: 'center' }}>{steps[index].label}</Text>
      <Text style={{ color: colors.mutedText, fontSize: 64, textAlign: 'center' }}>{remaining}s</Text>
      <Pressable onPress={() => setRunning((r) => !r)} style={{ backgroundColor: colors.primary, padding: spacing(2), borderRadius: roundness, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: typography.title }}>{running ? 'Pause' : 'Start'}</Text>
      </Pressable>
    </View>
  );
}