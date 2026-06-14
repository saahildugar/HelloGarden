import { Tabs } from 'expo-router';
import { useColorScheme, View, type ColorValue } from 'react-native';
import { Theme, Colors } from '@/constants/Colors';

// Tab icon placeholder — real icons added when icon library is wired up
function TabIcon({ focused, color }: { focused: boolean; color: ColorValue }) {
  return (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: focused ? color : 'transparent',
      }}
    />
  );
}

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Theme.dark : Theme.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.sagePrimary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: 'Garden',
          tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="seedbox"
        options={{
          title: 'SeedBox',
          tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} color={color} />,
        }}
      />
    </Tabs>
  );
}
