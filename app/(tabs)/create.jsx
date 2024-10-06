import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-web'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { CustomButton } from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { createPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Create=() =>
{
        const [ uploading, setUploading ]=useState( false )
        const { user }=useGlobalContext();
        const [ form, setForm ]=useState( {
                title: '',
                video: null,
                thumbnail: '',
                prompt: ''
        } )


        const openOicker=async ( type ) =>
        {

                // const result=await DocumentPicker.getDocumentAsync( { type: type==="image"? [ 'image/jpg', 'image/png', 'image/jpeg' ]:[ 'video/mp4', 'video/gif' ] } )
                const result=await ImagePicker.launchImageLibraryAsync( {
                        mediaTypes: type=='image'? ImagePicker.MediaTypeOptions.Images:ImagePicker.MediaTypeOptions.Videos,
                        allowsEditing: true,
                        aspect: [ 4, 3 ],
                        quality: 1
                } )
                if ( !result.canceled )
                {
                        if ( type=='image' )
                        {
                                setForm( { ...form, thumbnail: result.assets[ 0 ] } )
                        }
                        if ( type=='video' )
                        {
                                setForm( { ...form, thumbnail: result.assets[ 0 ] } )
                        }
                } else
                {
                        setTimeout( () =>
                        {
                                Alert.alert( 'Document Picked', JSON.stringify( result, null, 2 ) )
                        }, 100 )
                }
        }

        const submit=async () =>
        {
                if ( !form.prompt||!form.thumbnail||!form.title||!form.video )
                {
                        return Alert.alert( "Failed To Post", "Fill All The Fields Correctly" )
                }
                setUploading( true );
                try
                {
                        const post=await createPost( {
                                ...form, userId: user.$id
                        } )

                        Alert.alert( 'Success', 'Uploded Ypur File' )
                } catch ( e )
                {
                        Alert.alert( 'Error', error.message )
                } finally
                {
                        setForm( {
                                title: '',
                                video: null,
                                thumbnail: '',
                                prompt: ''
                        } )
                        setUploading( false )
                }
        }
        return (
                <SafeAreaView className='bg-primary h-full'>
                        <ScrollView className="px-4 my-6">
                                <Text className="text-white font-psemibold text-2xl">Video Upload</Text>

                                <FormField
                                        title='Poster Title'
                                        value={ form.title }
                                        placeholder="Upload Poster To Publicity"
                                        handleChangeText={ e => setForm( { ...form, title: e } ) }
                                        otherStyles="mt-10"
                                />
                                <View className="mt-70 space-y-12">
                                        <Text className="text-base text-grey-100 font-pmedium">
                                                Upload Video
                                        </Text>

                                        <TouchableOpacity onPress={ () => openPicker( 'video' ) }>
                                                { video? (
                                                        <Video source={ { uri: form.video.uri } }
                                                                className="w-full h-64 rounded-2xl"
                                                                useNativeControls
                                                                isLooping
                                                                resizeMode={ ResizeMode.CONTAIN }
                                                        />
                                                ):(
                                                        <View className="w-full h-full bg-black px-4 rounded-xl justify-center items-center">
                                                                <View className="w-14 h-14 border border-secondary justify-center items-center">
                                                                        <Image source={ icons.upload }
                                                                                resizeMode=""
                                                                                className="w-1/2 h-1/2" />
                                                                </View>
                                                        </View>
                                                ) }
                                        </TouchableOpacity>
                                </View>
                                <View className="my-7 space-y-2">
                                        <Text className="text-base text-grey-100 font-pmedium">
                                                Upload Poster
                                        </Text>

                                        <TouchableOpacity onPress={ () => openPicker( 'image' ) }>
                                                { thumbnail? (
                                                        <Image source={ { uri: form.thumbnail.uri } }
                                                                className="w-full h-64 rounded-2xl"
                                                                resizeMode="contain"
                                                        />
                                                ):(
                                                        <View className="w-full h-16 bg-black px-4 rounded-2xl justify-center items-center border border-black-100 flex-row space-x-2">
                                                                <Image source={ icons.upload }
                                                                        resizeMode=""
                                                                        className="w-5 h-5" />
                                                                <Text className='text-sm text-gery-100 font-pmedium'>Choose File To Upoad</Text>
                                                        </View>
                                                ) }
                                        </TouchableOpacity>
                                </View>

                                <View className="my-7 space-y-2">
                                        <Text className="text-base text-grey-100 font-pmedium">
                                                Ai <Prompt></Prompt>
                                        </Text>

                                        <FormField title="Ai Prompt"
                                                placeholder="Prompt To SEarch Poster"
                                                value={ form.prompt }
                                                handleChangeText={ e => setForm( { ...form, prompt: e } ) }
                                                otherStyles="mt-7"
                                        />
                                </View>
                                <CustomButton
                                        title="Create Poster"
                                        handlePress={ submit }
                                        otherStyles="mt-7"
                                        isLoading={ uploading }
                                />

                        </ScrollView>
                </SafeAreaView>
        )
}

export default Create
