import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-web'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useEffect, useState } from 'react'
const Search=async ( { initialQuery } ) =>
{
        const [ query, setQuery ]=useState( initialQuery||'' )
        const { data: posts, refetch }=useAppWrite( () => searchPosts( query ) )
        useEffect( () =>
        {
                refetch()
        }, [ query ] )
        return (
                <SafeAreaView className="bg-primary h-full">
                        <FlatList
                                data={ posts }
                                keyExtractor={ item => item.$id }
                                renderItem={
                                        ( { item } ) =>
                                        {
                                                <VideoCard poster={ item } />
                                        }
                                }
                                ListHeaderComponent={ () => (
                                        <View className="mp-6 px-4">
                                                <Text className="font-pmedium text-sm text-grey-100">
                                                        Search Results
                                                </Text>
                                                <Text className="test-2xl font-psemibold text-white">AdWheels</Text>
                                                <SearchInput initialQuery={ query } />

                                                <View
                                                        className=""></View>
                                        </View>
                                ) }
                                ListEmptyComponent={ () => (
                                        <EmptyState title="No Search Video  Found"
                                                subtitle="be The First One To Upload The Poster " />
                                ) }
                        />
                </SafeAreaView>
        )
}

export default Search

const styles=StyleSheet.create( {} )