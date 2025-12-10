import { Modal, Pressable, Text, TextInput, View } from 'react-native';

export default function PasswordModal({ open, setOpen, password, setPassword, handleSaveProfile }) {
    return (
        <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="w-80 bg-white p-6 rounded-2xl">
                    <Text className="text-lg font-semibold mb-3">Enter a value</Text>

                    <TextInput
                        className="border border-gray-300 p-3 rounded-xl mb-4"
                        placeholder="Type here..."
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable className="bg-green-600 p-3 rounded-xl mb-2" onPress={handleSaveProfile}>
                        <Text className="text-white text-center">Save</Text>
                    </Pressable>

                    <Pressable className="bg-gray-300 p-3 rounded-xl" onPress={() => setOpen(false)}>
                        <Text className="text-center">Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
