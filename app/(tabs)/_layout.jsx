import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    // tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}
