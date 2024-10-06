import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { icons } from '../constants/icons'
import { router, usePathname } from 'expo-router';
const SearchInput=( { title, value, handleChangeText, keyBoardType, otherStyles } ) =>
{
        const pathname=usePathname();
        const [ query, setQuery ]=useState( "" );
        return (
                <View className="w-full h-16 px-4 bg-black-400 rounded-2xl focus:border-secondary items-center space-x-4">
                        <TextInput
                                className="text-base text-white mt-0.5 flex-1 font-pregular"
                                value={ query }
                                placeholder="Search For Video Topic "
                                placeholderTextColor="#CDCDE0"
                                onChangeText={ e => setQuery( e ) }
                        />
                        <TouchableOpacity onPress={ () =>
                        {
                                if ( !query ) return Alert.alert( 'Missing QUery', 'Enter Something To Search' )

                                if ( pathname.startsWith( '/search' ) ) router.setParams( { query } )
                                else router.push( `/search/${ query }` )
                        } } >
                                <Image source={ icons.search }
                                        className="w-5 h-5"
                                        resizeMode='contain' />
                        </TouchableOpacity>
                </View>
        )
}

export default SearchInput;

const styles=StyleSheet.create( {} )