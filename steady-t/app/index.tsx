import { Redirect } from 'expo-router';
import { useAppStore } from '../src/state/store';

export default function Index() {
  const hasOnboarded = useAppStore((s) => s.profile?.hasOnboarded === true);
  if (!hasOnboarded) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  return <Redirect href="/(tabs)" />;
}