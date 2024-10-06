import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FormField=( { title, value, handleChangeText, placeholder, keyBoardType, otherStyles } ) =>
{
        const [ isFocused, setIsFocused ]=useState( false ); // State to track focus
        const [ showPass, setShowPass ]=useState( false );

        return (
                <View className={ `space-y-2 ${ otherStyles }` }>
                        <Text className="text-base text-grey-100 font-pmedium">{ title }</Text>
                        <View
                                className={ `w-full h-16 px-4 bg-black-100 rounded-2xl flex-row items-center ${ isFocused? 'border-2 border-secondary':'border-2 border-black-100' }` }
                        >
                                <TextInput
                                        className="flex-1 text-white text-base font-psemibold"
                                        value={ value }
                                        placeholder={ placeholder }
                                        placeholderTextColor="#7b7b8b"
                                        onChangeText={ handleChangeText }
                                        secureTextEntry={ title==="Password"&&!showPass }
                                        onFocus={ () => setIsFocused( true ) }  // Set focus to true
                                        onBlur={ () => setIsFocused( false ) }   // Set focus to false
                                />
                                {/* Toggle for Password visibility */ }
                                { title==="Password"&&(
                                        <TouchableOpacity onPress={ () => setShowPass( !showPass ) }>
                                                <Text className="text-secondary ml-2">
                                                        { showPass? "Hide":"Show" }
                                                </Text>
                                        </TouchableOpacity>
                                ) }
                        </View>
                </View>
        )
}

export default FormField;
