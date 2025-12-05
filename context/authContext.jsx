import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            console.log(error?.message);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     *
     * @param {Object} param0 {name: String, email: String, password: String}
     * @returns {void} if there was an error then return a error message otherwise return null
     */
    const signup = async ({ name, email, password }) => {
        setIsLoading(true);
        try {
            await account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });
            await signin({ email, password });
        } catch (error) {
            console.log(error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     *
     * @param {Object} param0 {email: String, password: String}
     * @returns {null || Object} if there was an error then return a error message otherwise return null
     */
    const signin = async ({ email, password }) => {
        try {
            try {
                const currentSession = await account.getSession({
                    sessionId: 'current',
                });
                if (currentSession) {
                    await account.deleteSession({
                        sessionId: 'current',
                    });
                }
            } catch (error) {
                console.log(error);
            }
            // Create new session
            await account.createEmailPasswordSession({
                email: email,
                password: password,
            });
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    };

    const signout = async () => {
        setIsLoading(true);
        try {
            await account.deleteSession({ sessionId: 'current' });
            setUser(null);
            router.replace('/auth/login');
        } catch (error) {
            console.log(error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return <AuthContext.Provider value={{ user, signup, signin, isLoading, signout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be inside in the auth provider');
    }
    return context;
};
