import { AuthProvider, useAuth } from '@/context/authContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

const RouteGuard = ({ children }) => {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const segment = useSegments();

    useEffect(() => {
        setIsMounted(true);
        if (user?.email) {
            setIsAuth(true);
        }
    }, [user?.email]);

    useEffect(() => {
        if (!isMounted) return;
        const isAuthSegment = segment[0] === 'auth';

        if (!isAuth && !isAuthSegment && !isLoading && !user) {
            router.replace('/auth/login');
        } else if (user && isAuthSegment && !isLoading) {
            router.replace('/');
        }
    }, [isAuth, isLoading, isMounted, router, segment, user]);

    return <>{children}</>;
};

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <RouteGuard>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                    <StatusBar style="auto" />
                </RouteGuard>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
