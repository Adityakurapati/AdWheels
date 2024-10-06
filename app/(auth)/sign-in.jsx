import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { Link, useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { getCurrentUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import images from '../../constants/images';

const SignIn=() =>
{
        const { user, setUser, setIsLoggedIn }=useGlobalContext();
        const [ form, setForm ]=useState( {
                email: '',
                password: ''
        } );

        const [ isSubmitting, setIsSubmitting ]=useState( false );
        const router=useRouter(); // Added useRouter

        const submit=async () =>
        {
                if ( !form.password||!form.email )
                {
                        Alert.alert( 'Error', 'Please Fill All Fields' );
                        return; // Added return to prevent further execution
                }

                setIsSubmitting( true );
                try
                {
                        await signIn( { ...form } );
                        const result=await getCurrentUser();
                        setUser( result );
                        setIsLoggedIn( true );
                        router.replace( '/home' );
                } catch ( e )
                {
                        Alert.alert( 'Error', e.message );
                } finally
                {
                        setIsSubmitting( false );
                }
        };

        return (
                <SafeAreaView className="bg-primary h-full">
                        <ScrollView>
                                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                                        <Image source={ images.logo } className="w-[118px] h-[35px]" />
                                        <FormField
                                                title='Email'
                                                value={ form.email }
                                                handleChangeText={ ( text ) => setForm( { ...form, email: text } ) } // Corrected here
                                                keyBoardType="email-address"
                                                otherStyles="mt-7"
                                        />
                                        <FormField
                                                title='Password'
                                                value={ form.password }
                                                handleChangeText={ ( text ) => setForm( { ...form, password: text } ) } // Corrected here
                                                keyBoardType="default"
                                                otherStyles="mt-7"
                                        />
                                        <CustomButton
                                                title="Sign-in"
                                                handlePress={ submit }
                                                containerStyles="mt-7"
                                                isLoading={ isSubmitting }
                                        />
                                        <View className="flex-row justify-center pt-5 gap-2">
                                                <Text className="text-lg text-grey-100 font-pregular">Don't Have An Account </Text>
                                                <Link href='sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                                        </View>
                                </View>
                        </ScrollView>
                </SafeAreaView>
        );
};

export default SignIn;