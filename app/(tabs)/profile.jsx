import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordModal from '../../components/PasswordModal';
import { useAuth } from '../../context/authContext';
import { updateProfilePrefs } from '../../lib/appwrite';

export default function ProfileScreen({ navigation }) {
    const { user, signout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        location: user?.prefs?.location,
        bio: user?.prefs?.bio,
        avatar: user?.prefs?.avatar,
    });

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Logout',
                onPress: async () => {
                    try {
                        setIsLoading(true);
                        await signout();
                    } catch (error) {
                        Alert.alert('Error', 'Failed to logout.  Please try again.');
                    } finally {
                        setIsLoading(false);
                    }
                },
                style: 'destructive',
            },
        ]);
    };

    const handleSaveProfile = async () => {
        if (user.email === userInfo.email) delete userInfo.email;
        if (user.name === userInfo.name) delete userInfo.name;
        if (user.phone === userInfo.phone) delete userInfo.phone;

        try {
            setIsLoading(true);
            await updateProfilePrefs(userInfo, password);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    const handleCancelEdit = () => {
        setUserInfo({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            location: user?.prefs.location,
            bio: user?.prefs.bio,
            avatar: user?.prefs.avatar,
        });
        setIsEditing(false);
    };

    const renderInfoSection = () => (
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <Text className="text-base font-semibold text-gray-900 mb-4">Contact Information</Text>

            <View className="border-t border-gray-200 pt-4">
                {isEditing ? (
                    <>
                        <TextInput
                            label="Phone"
                            defaultValue={user?.phone || 'N/A'}
                            onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
                            mode="outlined"
                            className="mb-3"
                            left={<TextInput.Icon icon="phone" />}
                        />
                        <TextInput
                            label="Location"
                            defaultValue={user?.prefs?.location}
                            onChangeText={(text) => setUserInfo({ ...userInfo, location: text })}
                            mode="outlined"
                            className="mb-3"
                            left={<TextInput.Icon icon="map-marker" />}
                        />
                        <TextInput
                            label="Bio"
                            defaultValue={user?.prefs?.bio}
                            onChangeText={(text) => setUserInfo({ ...userInfo, bio: text })}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            left={<TextInput.Icon icon="text-box-outline" />}
                        />
                    </>
                ) : (
                    <>
                        <View className="flex-row items-center mb-4">
                            <MaterialCommunityIcons name="phone" size={20} color="#666" />
                            <Text className="ml-3 text-sm text-gray-700 flex-1">{userInfo.phone}</Text>
                        </View>

                        <View className="flex-row items-center mb-4">
                            <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
                            <Text className="ml-3 text-sm text-gray-700 flex-1">{userInfo.location}</Text>
                        </View>

                        <View className="flex-row">
                            <MaterialCommunityIcons name="text-box-outline" size={20} color="#666" />
                            <Text className="ml-3 text-sm text-gray-700 flex-1 leading-5">{userInfo.bio}</Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );

    const renderActionButtons = () => (
        <View className="gap-3 mb-4">
            {isEditing ? (
                <>
                    <Button
                        mode="contained"
                        onPress={() => setOpen(true)}
                        loading={isLoading}
                        disabled={isLoading}
                        icon="check"
                        className="py-1">
                        Save Changes
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleCancelEdit}
                        disabled={isLoading}
                        icon="close"
                        className="py-1">
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <Button mode="contained" onPress={() => setIsEditing(true)} icon="pencil" className="py-1">
                        Edit Profile
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => navigation?.navigate('Settings')}
                        icon="cog"
                        className="py-1">
                        Settings
                    </Button>
                </>
            )}
        </View>
    );

    const renderLogoutButton = () => (
        <Button
            mode="contained"
            onPress={handleLogout}
            loading={isLoading}
            disabled={isLoading}
            icon="logout"
            buttonColor="#dc2626"
            className="py-1">
            Logout
        </Button>
    );

    if (isLoading && !isEditing) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
                <ActivityIndicator animating={true} size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}>
                <PasswordModal
                    open={open}
                    setOpen={setOpen}
                    password={password}
                    setPassword={setPassword}
                    handleSaveProfile={handleSaveProfile}
                />
                {renderInfoSection()}
                {renderActionButtons()}
                {!isEditing && renderLogoutButton()}
            </ScrollView>
        </SafeAreaView>
    );
}
