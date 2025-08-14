import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useTheme } from '../../src/theme';
import { useAppStore, EquipmentLevel, Goal } from '../../src/state/store';

const equipmentOptions: EquipmentLevel[] = ['none', 'band', 'dumbbell', 'gym'];
const goalOptions: Goal[] = ['fat_loss', 'strength', 'consistency', 'energy'];

export default function Wizard() {
  const { colors, spacing, typography, roundness } = useTheme();
  const { setProfile, completeOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [equipment, setEquipment] = useState<EquipmentLevel>('none');
  const [sleepGoal, setSleepGoal] = useState('7');
  const [goals, setGoals] = useState<Goal[]>(['consistency']);

  const steps = [
    <View key="age" style={{ gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Your basics</Text>
      <TextInput placeholder="Age" placeholderTextColor={colors.mutedText} keyboardType="number-pad" value={age} onChangeText={setAge} style={inputStyle(colors, spacing, roundness, typography)} />
      <TextInput placeholder="Height (cm)" placeholderTextColor={colors.mutedText} keyboardType="number-pad" value={heightCm} onChangeText={setHeightCm} style={inputStyle(colors, spacing, roundness, typography)} />
      <TextInput placeholder="Waist (cm)" placeholderTextColor={colors.mutedText} keyboardType="number-pad" value={waistCm} onChangeText={setWaistCm} style={inputStyle(colors, spacing, roundness, typography)} />
    </View>,
    <View key="equipment" style={{ gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Equipment</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) }}>
        {equipmentOptions.map((opt) => (
          <Pressable key={opt} onPress={() => setEquipment(opt)} style={{ paddingVertical: spacing(1.2), paddingHorizontal: spacing(2), borderRadius: roundness, backgroundColor: equipment === opt ? colors.primary : colors.tile }}>
            <Text style={{ color: equipment === opt ? 'white' : colors.text }}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>,
    <View key="sleep" style={{ gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Sleep goal (h)</Text>
      <TextInput placeholder="7" placeholderTextColor={colors.mutedText} keyboardType="decimal-pad" value={sleepGoal} onChangeText={setSleepGoal} style={inputStyle(colors, spacing, roundness, typography)} />
    </View>,
    <View key="goals" style={{ gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Goals</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) }}>
        {goalOptions.map((opt) => (
          <Pressable key={opt} onPress={() => setGoals((g) => (g.includes(opt) ? g.filter((x) => x !== opt) : [...g, opt]))} style={{ paddingVertical: spacing(1.2), paddingHorizontal: spacing(2), borderRadius: roundness, backgroundColor: goals.includes(opt) ? colors.primary : colors.tile }}>
            <Text style={{ color: goals.includes(opt) ? 'white' : colors.text }}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>,
  ];

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setProfile({
        age: parseInt(age || '0', 10) || undefined,
        heightCm: parseInt(heightCm || '0', 10) || undefined,
        waistCm: parseInt(waistCm || '0', 10) || undefined,
        sleepGoalHours: parseFloat(sleepGoal || '7') || 7,
        equipment,
        goals,
      });
      completeOnboarding();
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <View style={{ flex: 1 }}>{steps[step]}</View>
      <Pressable onPress={next} style={{ backgroundColor: colors.primary, padding: spacing(2), borderRadius: roundness, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: typography.title, fontWeight: '600' }}>{step < steps.length - 1 ? 'Continue' : 'Finish'}</Text>
      </Pressable>
    </View>
  );
}

function inputStyle(colors: any, spacing: any, roundness: number, typography: any) {
  return {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: roundness,
    padding: spacing(1.5),
    fontSize: typography.body,
  } as const;
}