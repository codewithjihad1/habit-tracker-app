import { updateHabitById } from '@/lib/appwrite';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Checkbox, Chip, IconButton, Menu } from 'react-native-paper';

const HabitCard = ({ habit, onComplete, onEdit, onDelete }) => {
    const [isCompleted, setIsCompleted] = useState(habit?.isCompleted);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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

    const handleCompleteToggle = () => {
        setIsCompleted(!isCompleted);
    };

    const handleDelete = () => {
        Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    onDelete(habit.$id);
                    setMenuVisible(false);
                },
            },
        ]);
    };

    useEffect(() => {
        updateHabitById(habit.$id, { isCompleted });
    }, [habit.$id, isCompleted]);

    return (
        <>
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

                        {/* Menu Button */}
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <IconButton
                                    icon="dots-vertical"
                                    size={20}
                                    onPress={() => setMenuVisible(true)}
                                    className={'m-0'}
                                />
                            }>
                            <Menu.Item
                                onPress={() => {
                                    onEdit(habit);
                                    setMenuVisible(false);
                                }}
                                title="Edit"
                                leadingIcon="pencil"
                            />
                            <Menu.Item
                                onPress={() => {
                                    setModalVisible(true);
                                    setMenuVisible(false);
                                }}
                                title="View Details"
                                leadingIcon="information"
                            />
                            <Menu.Item onPress={handleDelete} title="Delete" leadingIcon="delete" textColor="red" />
                        </Menu>
                    </View>

                    {/* Frequency and Status Chips */}
                    <View className="flex-row gap-2 mb-4">
                        <Chip icon="repeat" textStyle={{ color: getFrequencyColor(habit.frequency) }}>
                            {habit.frequency}
                        </Chip>
                    </View>

                    {/* Complete Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: isCompleted ? '#10B981' : '#6366F1',
                        }}
                        className="py-3 px-4 rounded-lg flex-row items-center justify-center"
                        onPress={handleCompleteToggle}>
                        <Checkbox status={isCompleted ? 'checked' : 'unchecked'} color="#FFFFFF" />
                        <Text className="text-white font-semibold ml-2">
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                        </Text>
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </>
    );
};

export default HabitCard;

const styles = StyleSheet.create({
    strikethrough: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
});
