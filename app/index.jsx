import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, ScrollView, Text, StatusBar } from 'react-native';
import images from '../constants/images';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const App=() =>
{
        const { isLoading, isLoggedIn }=useGlobalContext();

        if ( !isLoading&&isLoggedIn )
        {
                router.push( '/home' );
                return null; // Avoid rendering anything after redirection.
        }


        return ( <SafeAreaView className="bg-primary h-full">
                <ScrollView contentContainerStyle={ { height: "100%" } }>
                        <View className="w-full justify-center items-center min-h-[85vh] px-4">
                                <Image source={ images.logo } className="w-[100px] h-[84px]" resizeMode='contain' />

                                <Image source={ images.cards } className="max-w-[380px] w-full h-[300px]" resizeMode='contain' />

                                <View className="relative mt-5">
                                        <Text className="text-3xl text-white font-bold text-center">
                                                Discover Endless Possibilities
                                                <Text className="text-secondary-200">Aura</Text>
                                        </Text>
                                        <Image source={ images.path } className="w-[138px] h-[15px] absolute -bottom-2 -right-8" resizeMode='contain' />
                                </View>

                                <Text className='text-sm text-center font-pregular text-grey-100 mt-7'>
                                        Where creativity Meets Innovation
                                </Text>

                                <CustomButton title="Continue With Email" handlePress={ () => { router.push( '/sign-in' ) } } containsStyles="w-full mt-7" />
                        </View>
                </ScrollView>

                <StatusBar backgroundColor={ "#161622" } style='light' />
        </SafeAreaView>
        );
};

export default App;
