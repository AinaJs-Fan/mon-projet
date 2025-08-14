import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../../src/theme';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';

function Tile({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors, spacing, roundness, typography } = useTheme();
  return (
    <View style={{ backgroundColor: colors.card, padding: spacing(2), borderRadius: roundness, marginBottom: spacing(1.5) }}>
      <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600' }}>{title}</Text>
      {subtitle ? <Text style={{ color: colors.mutedText }}>{subtitle}</Text> : null}
    </View>
  );
}

export default function Today() {
  const { colors, spacing, typography, roundness } = useTheme();
  const { t } = useTranslation();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: spacing(2) }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(2) }}>
        <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>{t('tabs.today')}</Text>
        <Link href="/workout/micro" asChild>
          <Pressable style={{ backgroundColor: colors.primary, paddingVertical: spacing(1), paddingHorizontal: spacing(2), borderRadius: roundness }}>
            <Text style={{ color: 'white' }}>{t('actions.iOnlyHave10Min')}</Text>
          </Pressable>
        </Link>
      </View>

      <Tile title="Workout (10/20/40 min)" />
      <Tile title="Sleep target" subtitle="≥ 7 h" />
      <Tile title="Protein target" subtitle=">= 120 g" />
      <Tile title="Anchor habits" />
      <Tile title="Education" subtitle="2-minute truth" />
    </ScrollView>
  );
}