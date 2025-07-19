import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'index') iconName = 'home';
        else if (route.name === 'MoodPage') iconName = 'happy-outline';
        else if (route.name === 'ChildProfile') iconName = 'person';
        else if (route.name === 'settings') iconName = 'settings';
        else if (route.name === 'ParentDashboard') iconName = 'shield-checkmark';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="MoodPage" options={{ title: 'Nest' }} />
      <Tabs.Screen name="ChildProfile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="VideoScreen" options={{ href: null }} />
      <Tabs.Screen name="StoryScreen" options={{ href: null }} />
      <Tabs.Screen name="ParentDashboard" options={{ title: 'Parent Demo' }} />
    </Tabs>
  );
}

{/* <Tabs.Screen
  // Name of the dynamic route.
  name="[user]"
  options={{
    // Ensure the tab always links to the same href.
    href: '/evanbacon',
    // OR you can use the href object.
    href: {
      pathname: '/[user]',
      params: {
        user: 'evanbacon',
      },
    },
  }}
/> */}