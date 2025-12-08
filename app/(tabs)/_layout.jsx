import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
                    title: "Today's Habits",
                    tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="addHabit"
                options={{
                    title: 'Add Habit',
                    tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ color }) => <MaterialIcons name="query-stats" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
