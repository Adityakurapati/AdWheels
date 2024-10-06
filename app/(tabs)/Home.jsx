import { Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-web'
import images from '../../constants/images'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
const Home=async () =>
{

        const { user, setUser, setIsLoggedIn }=useGlobalContext();
        const { data: posts, refetch }=useAppWrite( getAllPosts );
        const { data: latestPosts }=useAppWrite( getLatestPosts );
        const onRefresh=async () =>
        {
                setRefreshing( true );

                await refetch()
                setRefreshing( false );
        }
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
                                        <View className="mp-6 px-4 space-y-6">
                                                <View className="justify-between items-start flex-row mb-6">
                                                        <View>
                                                                <Text className="font-pmedium text-sm text-grey-100">
                                                                        Welcome Back
                                                                </Text>
                                                                <Text className="test-2xl font-psemibold text-white">{ user.username }</Text>
                                                        </View>

                                                        <View className="mt-1.5">
                                                                <Image source={ images.logo }
                                                                        className="w-9 h-10"
                                                                        resizeMode='contain' />
                                                        </View>
                                                </View>

                                                <SearchInput />

                                                <View className="w-full flex-1 pt-5 pb-8 ">
                                                        <Text className="text-grey-100 text-lg font-pregular mb-3">
                                                                Latest Videos
                                                        </Text>
                                                        <Trending posts={ latestPosts } />
                                                </View>
                                        </View>
                                ) }
                                ListEmptyComponent={ () => (
                                        <EmptyState title="No Posters Found"
                                                subtitle="upload The posters now" />
                                ) }
                                refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
                        />
                </SafeAreaView>
        )
}

export default Home

const styles=StyleSheet.create( {} )