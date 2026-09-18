import * as api from "@/features/auth/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
   createContext,
   useContext,
   useEffect,
   useState,
   type ReactNode,
} from "react";

type MemberIDs = {
   user_id: number;
   member_id: number;
};

interface AuthContextType {
   memberIDs: MemberIDs | null;
   authenticated: boolean;
   loading: boolean;
   login: (
      email: string,
      password: string
   ) => Promise<{
      success: boolean;
      message: string;
   }>;
   createAccount: (
      member_id: number,
      username: string,
      password: string
   ) => Promise<void>;
   logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "access_token";
const USER_ID_KEY = "user_id";
const MEMBER_ID_KEY = "member_id";

export function AuthProvider({
   children,
}: {
   children: ReactNode;
}) {
   const [memberIDs, setMemberIDs] = useState<MemberIDs | null>(null);
   const [authenticated, setAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const restoreSession = async () => {
         try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
            const storedMemberId = await AsyncStorage.getItem(MEMBER_ID_KEY);

            if (token && storedUserId && storedMemberId) {
               setMemberIDs({
                  user_id: Number(storedUserId),
                  member_id: Number(storedMemberId),
               });

               setAuthenticated(true);
            }
         } catch (error) {
            console.error("Failed to restore session:", error);
         } finally {
            setLoading(false);
         }
      };

      restoreSession();
   }, []);

   const login = async (
      username: string,
      password: string,
    ): Promise<{ message: string; success: boolean }> => {
      const res = await api.loginApi({
        username,
        password,
      });
    
      if (!res.success) {
       throw new Error(res.message)
      }
    
      await AsyncStorage.setItem(TOKEN_KEY, res.token);
    
      await AsyncStorage.setItem(
        USER_ID_KEY,
        String(res.user.user_id),
      );
    
      await AsyncStorage.setItem(
        MEMBER_ID_KEY,
        String(res.user.member_id),
      );
    
      setMemberIDs({
        user_id: res.user.user_id,
        member_id: res.user.member_id,
      });
    
      setAuthenticated(true);
    
      return {
        success: true,
        message: "Login successful.",
      };
   };

   const createAccount = async (
      member_id: number,
      username: string,
      password: string
   ) => {
      const res = await api.completeRegistrationApi({
         member_id,
         username,
         password,
      });

      if (!res.success) {
       throw new Error(res.message)
      }
    
      await AsyncStorage.setItem(
         TOKEN_KEY,
         res.token
      );

      await AsyncStorage.setItem(
         USER_ID_KEY,
         String(res.user.user_id)
      );

      await AsyncStorage.setItem(
         MEMBER_ID_KEY,
         String(res.user.member_id)
      );

      setMemberIDs({
         user_id: res.user.user_id,
         member_id: res.user.member_id,
      });

      setAuthenticated(true);
   };

   const logout = async () => {
      await AsyncStorage.multiRemove([
         TOKEN_KEY,
         USER_ID_KEY,
         MEMBER_ID_KEY,
      ]);

      setMemberIDs(null);
      setAuthenticated(false);
   };

   return (
      <AuthContext.Provider
         value={{
            memberIDs,
            authenticated,
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
      throw new Error(
         "useAuth must be used within an AuthProvider"
      );
   }

   return context;
}