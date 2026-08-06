import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ITEMS = [
  { name: 'index', title: 'Learn', icon: 'map' as const, iconFocused: 'map' as const },
  { name: 'library', title: 'Library', icon: 'library-outline' as const, iconFocused: 'library' as const },
  { name: 'practice', title: 'Practice', icon: 'play-circle-outline' as const, iconFocused: 'play-circle' as const },
  { name: 'quiz', title: 'Quiz', icon: 'bulb-outline' as const, iconFocused: 'bulb' as const },
  { name: 'profile', title: 'Profile', icon: 'person-outline' as const, iconFocused: 'person' as const },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  // Ensure enough bottom padding so navigation buttons are never overlapped by Android soft keys or iOS home indicator
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 12 : 28);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0F',
          borderTopColor: '#1A1A25',
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#555570',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
      }}
    >
      {TAB_ITEMS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={
                  focused
                    ? {
                        shadowColor: '#00E5FF',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                        elevation: 4,
                      }
                    : {}
                }
              >
                <Ionicons
                  name={focused ? tab.iconFocused : tab.icon}
                  size={22}
                  color={color}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
