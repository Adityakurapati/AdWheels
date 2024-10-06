import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
const signUp=async () =>
{
        const [ form, setForm ]=useState( {
                username: '',
                email: '',
                password: ''
        } )
        const [ isSubmitting, setIsSubmitting ]
                =useState( false );
        const submit=async () =>
        {
                if ( !form.username||!form.password||!form.email )
                {
                        Alert.alert( 'Error', 'Please Fill All Fields ' );
                }

                setIsSubmitting( true );
                try
                {
                        const result=await createUser( { ...form } )
                        setUser( result )
                        setIsLoggedIn( true )

                        router.replace( '/home' )
                } catch ( e )
                {
                        Alert.alert( 'Error', e.message );
                } finally
                {
                        setIsSubmitting( false );
                }
        }
        return (
                <SafeAreaView className="bg-primary h-full">
                        <ScrollView>
                                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                                        <Image source={ images.logo } className="w-[118px] h-[35px]" />

                                        <FormField title='Username' value={ form.username } handleChnageText={ () => setForm( { ...form, username: e } ) } otherStyles="mt-10" />

                                        <FormField title='Email' value={ form.email } handleChnageText={ () => setForm( { ...form, email: e } ) } keyBoardType="email-address" otherStyles="mt-7" />

                                        <FormField title='Password' value={ form.password } handleChangeText={ () => setForm( { ...form, password: e } ) } keyBoardType="password" otherStyles="mt-7" />

                                        <CustomButton title={ title } handlePress={ submit } containerStyles="mt-7" isLoading={ isSubmitting } />

                                        <View className="flex-row justify-center pt-5 gap-2">
                                                <Text className="text-lg text-grey-100 font-pregular">Have An Account Already? </Text>
                                                <Link href='sign-in' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                                        </View>
                                </View>
                        </ScrollView>
                </SafeAreaView>
        )
}

export default signUp

const styles=StyleSheet.create( {} )