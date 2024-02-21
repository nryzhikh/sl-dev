import { createContext, useState, useEffect, ReactNode } from 'react';
import { verifyUser } from '@/api/api';

interface AuthContextType {
  user: User | null;
  setUser: (value: User | null) => void;
  loading: boolean;
  noValidation: boolean;
  setNoValidation: (value: boolean) => void;
}

export interface User {
  username: string;
  user_id: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [ noValidation, setNoValidation ] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await verifyUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, noValidation, setNoValidation }}>
      {children}
    </AuthContext.Provider>
  );
};