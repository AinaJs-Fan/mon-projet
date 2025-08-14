import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../src/theme';

export default function Nutrition() {
  const { colors, spacing, typography } = useTheme();
  const [weightKg, setWeightKg] = useState('80');
  const proteinTarget = Math.round((parseFloat(weightKg || '0') || 0) * 1.6);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Nutrition</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: spacing(2), gap: spacing(1) }}>
        <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Protein target</Text>
        <TextInput value={weightKg} onChangeText={setWeightKg} placeholder="Body weight (kg)" placeholderTextColor={colors.mutedText} keyboardType="decimal-pad" style={{ backgroundColor: colors.tile, color: colors.text, borderRadius: 10, padding: spacing(1.2) }} />
        <Text style={{ color: colors.mutedText }}>≈ {proteinTarget} g/day (1.6 g/kg)</Text>
      </View>
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: spacing(2) }}>
        <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>Sample plates</Text>
        <Text style={{ color: colors.mutedText }}>Cultural plates coming soon</Text>
      </View>
    </View>
  );
}