import { CustomButton, FormField } from '@/components';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    console.log('submit', values)
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6 min-h-[85vh]">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px] mb-10"
            resizeMode="contain"
          />
          <Text className="text-white text-[22px] font-psemibold leading-[145%] -tracking-[1px] mb-8">
            Sign in
          </Text>
          <FormField
            title="Email"
            value={values.email}
            handleChangeText={(text) => setValues({ ...values, email: text })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={values.password}
            handleChangeText={(text) =>
              setValues({ ...values, password: text })
            }
            otherStyles="mt-7"
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            // isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;