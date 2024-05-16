import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getCurrentUser } from '../lib/appwrite';
import { Models } from 'react-native-appwrite';

export interface UserProps extends Models.Document {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

// Define the context type
interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
}

// Create the context with the correct type
const GlobalContext = createContext<GlobalContextType | null>(null);

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Define the props type for the GlobalProvider component
interface GlobalProviderProps {
  children: ReactNode;
}

// Define the GlobalProvider component
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res as any); // Ensure res is cast to the User type
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
