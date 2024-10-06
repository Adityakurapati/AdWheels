
import React, { useEffect, useState } from 'react'
import { getAllPosts } from './appwrite'
import { findNodeHandle } from 'react-native';
import { isLoading } from 'expo-font';
const useAppWrite=( fn ) =>
{
        const [ posts, setPosts ]=useState( {} );
        const [ refreshing, setRefreshing ]=useState( false );

        const fetchPosts=async () =>
        {
                setIsLoading( true );

                const newPosts=await fn();
                setPosts( newPosts );

                setIsLoading( false );
        }
        useEffect( () =>
        {
                fetchPosts()
        }, [] )

        const refetch=() => fetchPosts();
        return { posts, isLoading, refetch };
}
export default useAppWrite;