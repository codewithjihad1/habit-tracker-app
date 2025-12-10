import { deleteHabitById, updateHabitById } from '@/lib/appwrite';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Card, Chip } from 'react-native-paper';

const HabitCard = ({ habit, onComplete, onEdit, onDelete, handleProfileSave }) => {
    const [isCompleted, setIsCompleted] = useState(habit?.isCompleted);
    const [menuVisible, setMenuVisible] = useState(false);
    const getFrequencyColor = (frequency) => {
        switch (frequency) {
            case 'Daily':
                return '#FF6B6B';
            case 'Weekly':
                return '#4ECDC4';
            case 'Monthly':
                return '#95E1D3';
            default:
                return '#6C63FF';
        }
    };

    const handleDelete = () => {
        Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    deleteHabitById(habit.$id);
                },
            },
        ]);
    };

    useEffect(() => {
        updateHabitById(habit.$id, { isCompleted });
    }, [habit.$id, isCompleted]);

    /**
     * - Swipe left actions
     */
    const renderLeftAction = () => {
        return (
            <Pressable
                className="w-24 m-4 rounded-lg flex-col justify-center items-center bg-red-400"
                onPress={handleDelete}>
                <AntDesign name="delete" size={36} color="white" />
            </Pressable>
        );
    };

    /**
     * - Render right actions
     */
    const renderRightAction = () => {
        return (
            <Pressable className="w-28 m-4 rounded-lg flex-col justify-center items-center bg-green-400">
                {isCompleted ? (
                    <Text className="text-white">Completed</Text>
                ) : (
                    <AntDesign name="check-circle" size={36} color="white" onPress={() => setIsCompleted(true)} />
                )}
            </Pressable>
        );
    };

    return (
        <Swipeable renderLeftActions={renderLeftAction} renderRightActions={renderRightAction}>
            <Card
                style={[
                    {
                        backgroundColor: '#F0F9FF',
                        margin: 12,
                    },
                ]}>
                <Card.Content>
                    {/* Header with title and menu */}
                    <View className="flex-row justify-between items-start mb-3">
                        <View className="flex-1 mr-2">
                            <Text className="text-lg font-bold text-gray-900 mb-1">{habit.title}</Text>
                            <Text className="text-sm text-gray-600 leading-4">{habit.description}</Text>
                        </View>

                        <View className="flex-row gap-2 items-center p-2 rounded-full bg-yellow-100 ">
                            <AntDesign name="fire" size={18} color="black" />
                            <Text>0 day streak</Text>
                        </View>
                    </View>

                    {/* Frequency and Status Chips */}
                    <View className="flex-row gap-2 mb-4">
                        <Chip icon="repeat" textStyle={{ color: 'red' }}>
                            {habit.frequency}
                        </Chip>
                    </View>
                </Card.Content>
            </Card>
        </Swipeable>
    );
};

export default HabitCard;
