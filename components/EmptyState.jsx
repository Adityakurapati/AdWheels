import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState=( { title, subtitle } ) =>
{
        return (
                <View className="justify-center items-center px-4">
                        <Image source={ images.empty } className="w-[270px] h-[250px]" />
                        <Text className="font-pmedium text-sm text-grey-100">
                                { title }
                        </Text>
                        <Text className="test-2xl font-psemibold text-white mt-2 text-center">{ subtitle }</Text>

                        <CustomButton title="Add Poster" handlePress={ () => router.push( '/create' ) } containerStyles="w-full my-5" />
                </View>
        )
}

export default EmptyState

const styles=StyleSheet.create( {} )