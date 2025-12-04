import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';

const RouteGuard = ({ children }) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        if (!isAuth) {
            router.replace('/auth/login');
        }
    }, [isAuth, isMounted, router]);

    return <>{children}</>;
};

export default function RootLayout() {
    return (
        <RouteGuard>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </RouteGuard>
    );
}
