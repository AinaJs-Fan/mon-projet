import { View, Text } from 'react-native';
import { useTheme } from '../../src/theme';
import Svg, { Polyline, Line } from 'react-native-svg';

export default function Insights() {
  const { colors, spacing, typography } = useTheme();
  const data = [92, 91, 90.5, 90];
  const width = 320;
  const height = 160;
  const padding = 16;
  const xStep = (width - padding * 2) / (data.length - 1);
  const minY = Math.min(...data);
  const maxY = Math.max(...data);
  const yRange = maxY - minY || 1;
  const points = data
    .map((y, i) => {
      const x = padding + i * xStep;
      const yPx = padding + (1 - (y - minY) / yRange) * (height - padding * 2);
      return `${x},${yPx}`;
    })
    .join(' ');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing(2), gap: spacing(2) }}>
      <Text style={{ color: colors.text, fontSize: typography.headline, fontWeight: '700' }}>Insights</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: spacing(2) }}>
        <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '600', marginBottom: spacing(1) }}>Waist/Weight Trend</Text>
        <Svg width={width} height={height}>
          <Line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={colors.border} strokeWidth={1} />
          <Line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={colors.border} strokeWidth={1} />
          <Polyline points={points} fill="none" stroke={colors.primary} strokeWidth={3} />
        </Svg>
      </View>
    </View>
  );
}