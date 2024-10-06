import { Children, createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext=createContext();

export const useGlobalContext=() => useContext( GlobalContext );
export const GlobalProvider=( { children } ) =>
{
        const [ isLoggedIn, setIsLoggedIn ]=useState( false );
        const [ user, setUser ]=useState( '' );
        const [ isLoading, setIsLoading ]=useState( true );

        useEffect( () =>
        {
                getCurrentUser()
                        .then( res =>
                        {
                                if ( res )
                                {
                                        setUser( res );
                                        setIsLoggedIn( true );
                                } else
                                {
                                        setUser( null );
                                }
                        } )
                        .catch( e =>
                        {
                                console.log( e );
                        } )
                        .finally( () => setIsLoading( false ) );
        }, [] );

        return (
                <GlobalContext.Provider value={ {
                        isLoggedIn,
                        setIsLoggedIn,
                        user,
                        setUser,
                        isLoading,
                        setIsLoading
                } }>
                        { children }
                </GlobalContext.Provider>
        );
};
