import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import icons from '../constants/icons'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'

const VideoCard=( { video: { title, thumbnail, video, creator: { username, avatar } } } ) =>
{
        const [ play, setPlay ]=useState( false );
        return (
                <View className="flex-col items-center px-4 mb-14">
                        <View className="flex-row gap-3 items-start">
                                <View className="w-[46px] h-[46px] border border-secondary justify-center items-center p-0.5">
                                        <Image source={ { url: avatar } }
                                                className="w-full h-full rounded-lg"
                                                resizeMode="contain" />

                                        <View className="justify-center  flex-1 ml-3 gap-y-1">
                                                <Text className="text-white font-psemibold text-sm" numberOfLines={ 1 }>{ title }</Text>
                                                <Text className="text-xs text-gray-100" numberOfLines={ 1 }>{ username }</Text>
                                        </View>
                                </View>

                                <View className="pt-2">
                                        <Image source={ icons.menu }
                                                className="w-5 h-5 "
                                                resizeMode='contain' />
                                </View>
                        </View>

                        { play? (
                                <Video source={ { uri: item.video } }
                                        className="w-52 h-72 rounded-[35px] mt-3"
                                        resizeMode={ ResizeMode.CONTAIN }
                                        useNativeControls
                                        shouldPlay
                                        onPlaybackStatusUpdate={ status =>
                                        {
                                                {
                                                        if ( status.didJustFinish )
                                                        {
                                                                setPlay( false )
                                                        }
                                                }
                                        } }
                                />
                        ):(
                                <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                                        activeOpacity={ 0.7 }
                                        onPress={ () => setPlay( true ) }>
                                        <Image source={ thumbnail }
                                                className="w-full h-full rounded-xl mt-3"
                                                resizeMode='contain' />

                                        <Image source={ icons.play }
                                                className="w-12 h-12 absolute"
                                                resizeMode='contain' />
                                </TouchableOpacity>
                        )
                        }
                </View>
        )
}

export default VideoCard

const styles=StyleSheet.create( {} )