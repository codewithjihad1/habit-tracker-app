import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/authContext';

export default function LoginScreen() {
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignin = async () => {
        if (!inputValidation()) return;

        try {
            await signin({ email, password });
            router.replace('/');
        } catch (error) {
            if (error instanceof Error) {
                setError(error?.message);
            }
        }
    };

    const inputValidation = () => {
        if (!email && !password) {
            setError('Fill the all input field are required!');
        } else if (password.length < 6) {
            setError('Password must be 6 character.');
        } else {
            setError('');
            return true;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 justify-center gap-6 p-6">
            <View className="flex-row justify-center">
                <Text className="mb-8 font-extrabold" variant="headlineMedium">
                    Login
                </Text>
            </View>
            <View className="flex-col gap-5 ">
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {error && (
                    <Text mode="titleMedium" className="text-red-500">
                        {error}
                    </Text>
                )}

                <Button mode="contained" onPress={handleSignin}>
                    Signin
                </Button>
            </View>

            <View className="flex-row gap-2 justify-center">
                <Text variant="titleMedium">{"Didn't have any account"}</Text>
                <Link href="/auth/signup" className="text-lg text-violet-600">
                    Signup{' '}
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}
