import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/authContext';

export default function ProfileScreen({ navigation }) {
    const { user, signout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+880 1555555555',
        location: user?.location || 'Dhaka, BD',
        bio: user?.bio || 'Mobile developer passionate about React Native',
        avatar: user?.avatar,
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
        try {
            setIsLoading(true);
            // Call your API to update user profile
            // await updateUserProfile(userInfo);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setUserInfo({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '+880 15555555',
            location: user?.location || 'Dhaka, BD',
            bio: user?.bio || 'Mobile developer passionate about React Native',
            avatar: user?.avatar,
        });
        setIsEditing(false);
    };

    // const renderProfileHeader = () => (
    //     <SafeAreaView className="items-center mb-6 bg-white rounded-2xl py-6 px-4 shadow-md">
    //         <TouchableOpacity className="relative mb-4">
    //             {userInfo.avatar ? (
    //                 <Image
    //                     source={{ uri: userInfo.avatar }}
    //                     className="w-24 h-24 rounded-full border-4 border-gray-200"
    //                 />
    //             ) : (
    //                 <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center border-4 border-gray-200">
    //                     <View className="text-2xl font-bold text-white">{userInfo.name.charAt(0).toUpperCase()}</View>
    //                 </View>
    //             )}
    //             {isEditing && (
    //                 <View className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 elevation-5">
    //                     <MaterialCommunityIcons name="camera" size={24} color="#fff" />
    //                 </View>
    //             )}
    //         </TouchableOpacity>

    //         {isEditing ? (
    //             <TextInput
    //                 label="Name"
    //                 value={userInfo.name}
    //                 onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
    //                 mode="outlined"
    //                 className="w-full mt-3"
    //             />
    //         ) : (
    //             <View className="text-2xl font-bold text-gray-900 mt-4">{userInfo.name}</View>
    //         )}

    //         {isEditing ? (
    //             <TextInput
    //                 label="Email"
    //                 value={userInfo.email}
    //                 onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
    //                 mode="outlined"
    //                 editable={false}
    //                 className="w-full mt-3"
    //             />
    //         ) : (
    //             <View className="text-sm text-gray-600 mt-2">{userInfo.email}</View>
    //         )}
    //     </SafeAreaView>
    // );

    const renderInfoSection = () => (
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <Text className="text-base font-semibold text-gray-900 mb-4">Contact Information</Text>

            <View className="border-t border-gray-200 pt-4">
                {isEditing ? (
                    <>
                        <TextInput
                            label="Phone"
                            value={userInfo.phone}
                            onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
                            mode="outlined"
                            className="mb-3"
                            left={<TextInput.Icon icon="phone" />}
                        />
                        <TextInput
                            label="Location"
                            value={userInfo.location}
                            onChangeText={(text) => setUserInfo({ ...userInfo, location: text })}
                            mode="outlined"
                            className="mb-3"
                            left={<TextInput.Icon icon="map-marker" />}
                        />
                        <TextInput
                            label="Bio"
                            value={userInfo.bio}
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
                        onPress={handleSaveProfile}
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
                {/* {renderProfileHeader()} */}
                {renderInfoSection()}
                {renderActionButtons()}
                {!isEditing && renderLogoutButton()}
            </ScrollView>
        </SafeAreaView>
    );
}
