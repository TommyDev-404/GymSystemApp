import * as api from "@/features/auth/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface MemberInfo {
  id: number;
  memberId: number,
  username: string;
  email: string;
  profile: string;
  pass_last_changed: string
}

interface AuthContextType {
  member: MemberInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  createAccount: (member_id: number,username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setMember: (params: MemberInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "member";
const TOKEN_KEY = "access_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore login session
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        const savedUser = await AsyncStorage.getItem(USER_KEY);

        if (token && savedUser) {
          setMember(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.loginApi({
      username,
      password,
    });

    await AsyncStorage.setItem(TOKEN_KEY, res.token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(res.user));

    setMember(res.user);
  };

  const createAccount = async (member_id: number, username: string, password: string) => {
    const res = await api.completeRegistrationApi({
      member_id,
      username,
      password
    });
    
    await AsyncStorage.setItem(TOKEN_KEY, res.token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(res.user));

    setMember(res.user);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    setMember(null);
  };

  return (
    <AuthContext.Provider
      value={{
        member,
        setMember,
        loading,
        login,
        createAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}