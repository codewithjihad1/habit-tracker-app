import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View>
                <Text className="text-4xl text-red-500">Home route!</Text>
            </View>
        </SafeAreaView>
    );
}
