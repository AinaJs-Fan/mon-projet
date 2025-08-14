import { View, Text } from 'react-native';
import { useTheme } from '../../src/theme';

export default function Plan() {
  const { colors, spacing, typography } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Plan</Text>
      <View style={{ flexDirection: 'row', gap: spacing(1) }}>
        <Chip label="Minimum" />
        <Chip label="Better" />
        <Chip label="Optimal" />
      </View>
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: spacing(2) }}>
        <Text style={{ color: colors.mutedText }}>Weekly calendar (swaps coming soon)</Text>
      </View>
    </View>
  );
}

function Chip({ label }: { label: string }) {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ backgroundColor: colors.tile, borderRadius: 999, paddingVertical: spacing(0.5), paddingHorizontal: spacing(1) }}>
      <Text style={{ color: colors.text }}>{label}</Text>
    </View>
  );
}