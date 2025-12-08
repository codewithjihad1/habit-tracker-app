import HabitCard from '@/components/HabitCard';
import { useAuth } from '@/context/authContext';
import { client, getHabitsByUserId, habitCollectionId, habitDbId } from '@/lib/appwrite';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { user } = useAuth();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchHabits = async () => {
                const res = await getHabitsByUserId(user?.$id);
                if (res) setHabits(res?.documents);
            };

            const habitsChannel = `databases.${habitDbId}.collections.${habitCollectionId}.documents`;
            const habitsSubscription = client.subscribe(habitsChannel, (response) => {
                if (response.events.includes('databases.*.collections.*.documents.*.create')) {
                    fetchHabits();
                } else if (response.events.includes('databases.*.collections.*.documents.*.update')) {
                    fetchHabits();
                } else if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
                    fetchHabits();
                }
            });

            //   const completionsChannel = `databases.${habitDbId}.collections.${habitCollectionId}.documents`;
            //   const completionsSubscription = client.subscribe(
            //     completionsChannel,
            //     (response) => {
            //       if (
            //         response.events.includes(
            //           "databases.*.collections.*.documents.*.create"
            //         )
            //       ) {
            //         fetchTodayCompletions();
            //       }
            //     }
            //   );

            fetchHabits();
            //   fetchTodayCompletions();

            return () => {
                habitsSubscription();
                // completionsSubscription();
            };
        }
    }, [user]);

    return (
        <SafeAreaView>
            <View className="flex-row justify-center mb-6">
                <Text variant="headlineMedium">{"Today's Habits"}</Text>
            </View>

            <ScrollView>
                {habits.length === 0 ? (
                    <View>
                        <Text>No Habit yet. Add new Habit</Text>
                    </View>
                ) : (
                    habits.length >= 0 && habits.map((habit) => <HabitCard key={habit.$id} habit={habit} />)
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
