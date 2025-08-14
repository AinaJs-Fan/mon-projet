import { Link } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import { useTheme } from '../../src/theme';
import { useTranslation } from 'react-i18next';

export default function Welcome() {
  const { colors, typography, spacing, roundness } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), justifyContent: 'space-between' }}>
      <View />
      <View style={{ gap: spacing(2) }}>
        <Text style={{ fontSize: typography.display, color: colors.text, fontWeight: '700' }}>{t('welcome.headline')}</Text>
        <Text style={{ fontSize: typography.body, color: colors.mutedText }}>{t('welcome.explainer')}</Text>
      </View>
      <View style={{ gap: spacing(2) }}>
        <Text style={{ color: colors.mutedText, fontSize: typography.caption }}>{t('welcome.consent')}</Text>
        <Link href="/(onboarding)/wizard" asChild>
          <Pressable style={{ backgroundColor: colors.primary, padding: spacing(2), borderRadius: roundness, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: typography.title, fontWeight: '600' }}>{t('actions.continue')}</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}