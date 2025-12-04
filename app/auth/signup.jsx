import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function AuthScreen() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 justify-center gap-6 p-6">
            <View className="flex-row justify-center">
                <Text className="mb-8 font-extrabold" variant="headlineMedium">
                    Create an account.
                </Text>
            </View>
            <View className="flex-col gap-5 ">
                <TextInput mode="outlined" label="Name" placeholder="Enter your full name" />

                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput mode="outlined" label="Password" textContentType="newPassword" secureTextEntry />

                <TextInput mode="outlined" label="Password" textContentType="password" secureTextEntry />

                <Button mode="contained">Create Account</Button>
            </View>

            <View className="flex-row gap-2 justify-center">
                <Text variant="titleMedium">Already have an account.</Text>
                <Link href="/auth/login" className="text-lg text-violet-600">
                    Signin
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}
