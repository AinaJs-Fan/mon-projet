import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../src/theme';

export default function Learn() {
  const { colors, spacing, typography } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Learn</Text>
      <TextInput placeholder="Search" placeholderTextColor={colors.mutedText} style={{ backgroundColor: colors.card, color: colors.text, borderRadius: 10, padding: spacing(1.2) }} />
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: spacing(2) }}>
        <Text style={{ color: colors.mutedText }}>Education cards coming soon</Text>
      </View>
    </View>
  );
}