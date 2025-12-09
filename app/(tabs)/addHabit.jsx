import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/authContext';
import { createHabit } from '../../lib/appwrite';

export default function AddHabitScreen() {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('Daily');
    const [isLoading, setIsLoading] = useState(false);
    // const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);
    const navigation = useRouter();

    const frequencies = ['Daily', 'Weekly', 'Monthly'];

    const validateForm = () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a habit title');
            return false;
        }
        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a description');
            return false;
        }
        return true;
    };

    const handleAddHabit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            // Prepare habit data
            const habitData = {
                title: title.trim(),
                description: description.trim(),
                frequency: frequency,
                userId: user?.$id,
            };

            await createHabit(habitData);

            Alert.alert('Success', 'Habit added successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        setTitle('');
                        setDescription('');
                        setFrequency('Daily');
                        navigation.back();
                    },
                },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to add habit. Please try again.');
            console.error('Error adding habit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigation.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
                <TouchableOpacity onPress={handleCancel}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Add New Habit</Text>
                <View className="w-7" />
            </View>

            {/* Form Content */}
            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                {/* Title Section */}
                <View className="mb-6">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Habit Title *</Text>
                    <TextInput
                        label="Enter habit name"
                        value={title}
                        onChangeText={setTitle}
                        mode="outlined"
                        placeholder="e.g., Morning Exercise, Read Books"
                        className="bg-white mb-2 mr-3"
                        disabled={isLoading}
                        left={<TextInput.Icon icon="lightbulb-outline" />}
                    />
                    <Text className="text-xs text-gray-500 mt-1">Give your habit a clear and motivating name</Text>
                </View>

                {/* Description Section */}
                <View className="mb-6">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Description *</Text>
                    <TextInput
                        label="Enter habit description"
                        value={description}
                        onChangeText={setDescription}
                        mode="outlined"
                        placeholder="30 minutes of jogging every morning"
                        multiline
                        numberOfLines={4}
                        className="bg-white mb-2 mr-3"
                        disabled={isLoading}
                        left={<TextInput.Icon icon="text-box-outline" />}
                    />
                    <Text className="text-xs text-gray-500 mt-1">
                        Describe what this habit is about and why it matters to you
                    </Text>
                </View>

                {/* Frequency Section */}
                <View className="mb-8">
                    <Text className="text-base font-semibold text-gray-900 mb-3">Frequency *</Text>

                    {/* Frequency Buttons */}
                    <View className="flex-row gap-3">
                        {frequencies.map((freq) => (
                            <TouchableOpacity
                                key={freq}
                                onPress={() => setFrequency(freq)}
                                className={`flex-1 py-3 px-4 rounded-lg items-center justify-center border-2 ${
                                    frequency === freq ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'
                                }`}
                                disabled={isLoading}>
                                <View className="flex-row items-center justify-center gap-2">
                                    <MaterialCommunityIcons
                                        name={
                                            freq === 'Daily'
                                                ? 'calendar-today'
                                                : freq === 'Weekly'
                                                  ? 'calendar-week'
                                                  : 'calendar-month'
                                        }
                                        size={20}
                                        color={frequency === freq ? '#fff' : '#6b7280'}
                                    />
                                    <Text
                                        className={`font-semibold ${
                                            frequency === freq ? 'text-white' : 'text-gray-700'
                                        }`}>
                                        {freq}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="text-xs text-gray-500 mt-2">Choose how often you want to perform this habit</Text>
                </View>

                {/* Info Card */}
                <View className="bg-blue-50 rounded-lg p-4 mb-8 border border-blue-200">
                    <View className="flex-row gap-3">
                        <MaterialCommunityIcons name="information-outline" size={24} color="#3b82f6" />
                        <View className="flex-1">
                            <Text className="font-semibold text-blue-900 mb-1">Pro Tip</Text>
                            <Text className="text-sm text-blue-800">
                                Start with small, achievable habits and gradually increase difficulty as they become
                                part of your routine.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className="px-4 py-4 bg-white border-t border-gray-200 gap-3">
                <Button
                    mode="contained"
                    onPress={handleAddHabit}
                    loading={isLoading}
                    disabled={isLoading}
                    icon="plus"
                    buttonColor="#3b82f6"
                    textColor="#fff"
                    className="py-1">
                    Add Habit
                </Button>
            </View>
        </SafeAreaView>
    );
}
