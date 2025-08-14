import { View, Text } from 'react-native';
import { useTheme } from '../../src/theme';

export default function Habits() {
  const { colors, spacing, typography } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Habits</Text>
      <View style={{ backgroundColor: colors.card, padding: spacing(2), borderRadius: 14 }}>
        <Text style={{ color: colors.mutedText }}>Daily sliders and weekly summaries coming soon</Text>
      </View>
    </View>
  );
}