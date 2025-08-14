import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../src/theme';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function Care() {
  const { colors, spacing, typography, roundness } = useTheme();

  async function exportLabSlip() {
    const html = `
      <html><body>
      <h2>Lab Slip: Morning Testosterone Testing</h2>
      <p>Two morning total testosterone tests (07:00–11:00) on different days; consider LH/FSH, prolactin, SHBG.</p>
      <ul>
        <li>Timing: 07:00–11:00</li>
        <li>Repeat: On two different days</li>
        <li>Optional: LH/FSH, prolactin, SHBG</li>
      </ul>
      <p>FAQ: This is informational and not medical advice.</p>
      </body></html>`;
    const { uri } = await Print.printToFileAsync({ html });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Care Path</Text>
      <View style={{ backgroundColor: colors.card, padding: spacing(2), borderRadius: 14, gap: spacing(1) }}>
        <Text style={{ color: colors.mutedText }}>Red-flag screener and clinic locator coming soon</Text>
        <Pressable onPress={exportLabSlip} style={{ backgroundColor: colors.primary, padding: spacing(1.5), borderRadius: roundness, alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Export testing instructions</Text>
        </Pressable>
      </View>
    </View>
  );
}