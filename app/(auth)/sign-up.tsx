import { View, Text, Image, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { CustomButton, FormField } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (
      values.username === '' ||
      values.email === '' ||
      values.password === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(
        values.email,
        values.password,
        values.username
      );
      // setUser(result);
      // setIsLogged(true);

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign up
          </Text>

          <FormField
            title="Username"
            value={values.username}
            handleChangeText={(text) =>
              setValues({ ...values, username: text })
            }
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={values.email}
            handleChangeText={(text) => setValues({ ...values, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={values.password}
            handleChangeText={(text) =>
              setValues({ ...values, password: text })
            }
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
