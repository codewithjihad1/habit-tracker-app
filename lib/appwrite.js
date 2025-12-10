const { Client, Account, ID, Databases, Query } = require('react-native-appwrite');

export const habitDbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
export const habitCollectionId = process.env.EXPO_PUBLIC_APPWRITE_COL_ID;

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);

// const db = new TablesDB(client);
const db = new Databases(client);

/**
 *
 * @param {Object} data Habit information
 */
export const createHabit = async (data) => {
    try {
        await db.createDocument(habitDbId, habitCollectionId, ID.unique(), data);
    } catch (error) {
        console.log(error.message);
    }
};

export const getHabitsByUserId = async (userId) => {
    try {
        const res = await db.listDocuments(habitDbId, habitCollectionId, [Query.equal('userId', userId)]);
        return res;
    } catch (error) {
        console.log(error?.message);
    }
};

export const updateHabitById = async (habitId, data) => {
    try {
        await db.updateDocument(habitDbId, habitCollectionId, habitId, data);
    } catch (error) {
        console.log(error.message);
    }
};

/**
 *
 * @param {string} habitId enter the habitId
 */
export const deleteHabitById = async (habitId) => {
    try {
        await db.deleteDocument(habitDbId, habitCollectionId, habitId);
    } catch (error) {
        console.log(error?.message);
    }
};

export const updateProfilePrefs = async (data, password) => {
    try {
        if (data?.name) {
            await account.updateName(data.name);
        }
        if (data?.phone) {
            await account.updatePhone(data?.phone, password);
        }
        if (data?.email) {
            await account.updateEmail(data?.email, password);
        }

        delete data?.email;
        delete data?.phone;
        delete data?.name;
        const response = await account.updatePrefs(data);
        return response;
    } catch (error) {
        console.log('Update prefs error:', error);
        throw error;
    }
};
