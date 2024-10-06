import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';
import icons from '../constants/icons';
import { ImageBackground } from 'react-native-web';
import { ResizeMode, Video } from 'expo-av';

const zoomIn={
        0: {
                scale: 0.9
        }, 1: {
                scale: 1
        }
}
const zoomOut={
        0: {
                scale: 1
        }, 1: {
                scale: 0.9
        }
}
const TrendingItem=( { activeItem, item } ) =>
{
        const [ play, setPlay ]=useState( false );
        return (
                <Animatable.View className=""
                        animation={ activeItem==item.$id? zoomIn:zoomOut }
                        duration={ 500 }>
                        { play? (
                                <Video source={ { uri: item.video } }
                                        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
                                <TouchableOpacity className="w-full h-60 rounded-xl relative justify-center items-center " activeOpacity={ 0.7 } onPress={ () => setPlay( true ) }>
                                        <ImageBackground source={ { uri: thumbnail } }
                                                className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                                                resizeMode='contain' />
                                        <Image className="w-5 h-5 absolute" source={ icons.play }
                                                resizeMode='contain' />
                                </TouchableOpacity>
                        ) }
                </Animatable.View>
        )
}
const Trending=( { posts } ) =>
{
        const [ activeItem, setActiveItem ]=useState( posts[ 0 ] )
        const viewableItemsChanged=( { viewAbleItems } ) =>
        {
                setActiveItem( viewAbleItems[ 0 ].key )

        }
        return (
                <FlatList
                        data={ posts }
                        keyExtractor={ item => item.$id }
                        renderItem={
                                ( { item } ) =>
                                {
                                        <TrendingItem activeItem={ activeItem } />
                                }
                        }
                        onViewableItemsChanged={ viewableItemsChanged }
                        viewabillityConfig={ { itemsVisiblePercentThreshold: 70 } }
                        contentOffset={ { x: 170 } }
                        horizontal />
        )
}

export default Trending

const styles=StyleSheet.create( {} )