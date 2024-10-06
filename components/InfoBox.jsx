import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoBox=( { title, subtitle, containStyles, textStyles } ) =>
{
        return (
                <View className={ containStyles }>
                        <Text className={ `text-white text-center font-psemibold  ${ textStyles }` }>{ title }</Text>
                        <Text className="text-sm text-grey-100 text-center font-pregular">
                                { subtitle }
                        </Text>
                </View>
        )
}

export default InfoBox

const styles=StyleSheet.create( {} )