import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-web'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { TouchableOpacity } from 'react-native'
import icons from '../../constants/icons'
import InfoBox from '../../components/InfoBox'
import { useGlobalContext } from '../../context/GlobalProvider'

const Profile=async ( { initialQuery } ) =>
{
        const { user, setUser, setIsLoggedIn }=useGlobalContext();
        const { data: posts, refetch }=useAppWrite( () => getUserPosts( user.$id ) )

        const logout=async () =>
        {
                await signOut();
                setUser( null )
                setIsLoggedIn( false )

                router.replace( '/sign-in' )
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
                                        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                                                <TouchableOpacity className="w-full items-end px-4 mb-8" onPress={ logout }>
                                                        <Image source={ icons.logout }
                                                                className="w-[35px] h-[35px] rounded-lg"
                                                                resizeMode='contain'
                                                        />
                                                </TouchableOpacity>

                                                <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
                                                        <Image source={ { uri: user?.avatar } }
                                                                className=""
                                                                resizeMode='cover'
                                                        />
                                                        <InfoBox title={ user?.username }
                                                                containStyles="mt-5"
                                                                textStyles="text-lg" />
                                                        <View className="mt-5 flex-row">
                                                                <InfoBox title={ posts.length||0 }
                                                                        containStyles="mr-10"
                                                                        subtitle="Posts"
                                                                        textStyles="text-xl" />
                                                                <InfoBox title={ posts.likes }
                                                                        subtitle="Followers"
                                                                        containStyles=""
                                                                        textStyles="text-xl" />
                                                        </View>
                                                </View>
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

export default Profile

const styles=StyleSheet.create( {} )