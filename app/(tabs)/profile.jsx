import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/authContext';

export default function ProfileScreen() {
    const { user, signout } = useAuth();

    return (
        <SafeAreaView>
            <Text>{user?.name}</Text>
            <Text>{user?.email}</Text>
            <View>
                <Button mode="contained" onPress={signout}>
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
}
