import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig={
        endpoint: 'https://cloud.appwrite.io/v1',
        platform: 'com.jsm.adwheels',
        projectId: '66fc322b003996767288',
        databaseId: '66fc34610006cfba8c38',
        userCollectionId: '66fc40fb000382880d72',
        videoConnectionId: '66fc4113000840202224',
        storageId: '66fc433f0002715dda6f'
};

// Init your React Native SDK
const client=new Client();

client
        .setEndpoint( appwriteConfig.endpoint ) // Your Appwrite Endpoint
        .setProject( appwriteConfig.projectId ) // Your project ID
        .setPlatform( appwriteConfig.platform ); // Your application ID or bundle ID

const account=new Account( client );
const avatars=new Avatars( client );
const databases=new Databases( client );
const storage=new Storage( client );

export const createUser=async ( { email, password, username } ) =>
{
        try
        {
                const user=await account.create(
                        ID.unique(),
                        email,
                        password,
                        username
                );

                if ( !user ) throw new Error( "User creation failed" );

                const avatarUrl=avatars.getInitials( username );
                await signIn( email, password );

                const newUser=await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.userCollectionId,
                        ID.unique(),
                        {
                                accountId: user.$id,
                                email: email,
                                username,
                                avatar: avatarUrl
                        }
                );
                return newUser;
        } catch ( e )
        {
                console.error( e );
                throw new Error( e );
        }
};

export const signIn=async ( email, password ) =>
{
        try
        {
                const session=await account.createEmailSession( email, password );
                return session;
        } catch ( e )
        {
                console.error( e );
                throw new Error( e );
        }
};

export const signOut=async () =>
{
        try
        {
                const session=account.deleteSession( 'current' );
                return session;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const getCurrentUser=async () =>
{
        try
        {
                const currentAccount=await account.get();
                if ( !currentAccount ) throw new Error( "No current account found" );

                const currentUser=await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.userCollectionId,
                        [ Query.equal( 'accountId', currentAccount.$id ) ]
                );
                if ( !currentUser.documents.length ) throw new Error( "User not found" );
                return currentUser.documents[ 0 ];
        } catch ( e )
        {
                console.error( e );
        }
};

export const getAllPosts=async () =>
{
        try
        {
                const posts=await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.videoConnectionId
                );

                return posts.documents;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const getLatestPosts=async () =>
{
        try
        {
                const posts=await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.videoConnectionId,
                        [ Query.orderDesc( '$createdAt' ), Query.limit( 7 ) ]
                );

                return posts.documents;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const searchPosts=async ( { query } ) =>
{
        try
        {
                const posts=await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.videoConnectionId,
                        [ Query.search( 'title', query ) ]
                );

                return posts.documents;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const getUserPosts=async ( { userId } ) =>
{
        try
        {
                const posts=await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.videoConnectionId,
                        [ Query.equal( 'creator', userId ) ]
                );

                return posts.documents;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const getFilePreview=async ( fileId, type ) =>
{
        let fileUrl;
        try
        {
                if ( type==='video' )
                {
                        fileUrl=storage.getFileView( appwriteConfig.storageId, fileId );
                } else if ( type==='image' )
                {
                        fileUrl=storage.getFilePreview( appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100 );
                } else
                {
                        throw new Error( "Invalid File Type" );
                }

                if ( !fileUrl ) throw new Error( "File URL not found" );
                return fileUrl;

        } catch ( e )
        {
                console.error( e );
                throw new Error( e );
        }
};

export const uploadFile=async ( file, type ) =>
{
        if ( !file ) return;
        const { mimeType, ...rest }=file;
        const asset={
                name: file.filename,
                type: file.mimetype,
                size: file.fileSize,
                uri: file.uri,
        };
        try
        {
                const uploadedFile=await storage.createFile(
                        appwriteConfig.storageId,
                        ID.unique(),
                        asset
                );
                const fileUrl=await getFilePreview( uploadedFile.$id, type );
                return fileUrl;
        } catch ( e )
        {
                throw new Error( e );
        }
};

export const createPost=async ( form ) =>
{
        try
        {
                const [ thumbnailUrl, videoUrl ]=await Promise.all( [
                        uploadFile( form.thumbnail, 'image' ),
                        uploadFile( form.video, 'video' )
                ] );
                const newPost=await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.videoConnectionId,
                        ID.unique(),
                        { title: form.title, thumbnail: thumbnailUrl, video: videoUrl, prompt: form.prompt, creator: form.userId }
                );
                return newPost;
        } catch ( e )
        {
                throw new Error( e );
        }
};
