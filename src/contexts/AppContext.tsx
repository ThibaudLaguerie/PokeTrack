import React from 'react';

type AppContextType = {

}

const defaultAppState: AppContextType = {
    isSignedIn: true,
    register: async () => undefined,
    signIn: async () => undefined,
    signOut: async () => undefined,
    getUserInfo: async () => undefined
}

const AppContext = React.createContext<AppContextType>(defaultAppState)

export const AppContextProvider: React.FC = ({ children }) => {

    return (
        <AppContext.Provider
            value={{

            }}>
            {children}
        </AppContext.Provider>
    );

}

export const useApp = () => {
    const app = React.useContext(AppContext)
    return app
}