import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton=( { title, handlePress, containerStyles, textStyles, isLoading } ) =>
{
        return (
                <TouchableOpacity
                        className={ `bg-secondary rounded-xl min-h-[62px] px-6 justify-center items-center ${ containerStyles } ${ isLoading? 'opacity-50':'' } ` }
                        onPress={ handlePress }
                        activeOpacity={ 0.7 }
                        disabled={ isLoading }

                >
                        <Text className={ `text-primary font-psemibold text-lg ${ textStyles }` }>{ title }</Text>
                </TouchableOpacity> )
}

export default CustomButton

const styles=StyleSheet.create( {} )