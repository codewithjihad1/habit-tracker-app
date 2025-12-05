import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/authContext';

export default function SignupScreen() {
    const { signup } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        if (!inputValidation()) return;

        try {
            await signup({ name, email, password });
            router.replace('/');
        } catch (error) {
            if (error instanceof Error) {
                setError(error?.message);
            }
        }
    };

    const inputValidation = () => {
        if (!name && !email && !password && !confPassword) {
            setError('Fill the all input field are required!');
        } else if (password.length < 6) {
            setError('Password must be 6 character.');
        } else if (password !== confPassword) {
            setError('Confirm password did not match.');
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
                    Create an account.
                </Text>
            </View>
            <View className="flex-col gap-5 ">
                <TextInput
                    mode="outlined"
                    label="Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={(e) => setName(e)}
                />

                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    textContentType="newPassword"
                    secureTextEntry
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    textContentType="password"
                    secureTextEntry
                    value={confPassword}
                    onChangeText={(e) => setConfPassword(e)}
                />

                {error && (
                    <Text variant="titleMedium" className="text-red-500 ">
                        {error}
                    </Text>
                )}

                <Button mode="contained" onPress={handleSubmit}>
                    Create Account
                </Button>
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
