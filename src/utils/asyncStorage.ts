import AsyncStorage from '@react-native-community/async-storage';

export const saveAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    return;
  }
};

export const getAsyncStorage = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result;
  } catch (error) {
    return;
  }
};

export const deleteAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    return;
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    return;
  }
};
