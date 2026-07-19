import {
   createContext,
   useContext,
   useEffect,
   type ReactNode,
 } from "react";
 
 import { socket } from "../lib/socket-client";
 import { useAuth } from "./AuthContext";
 
 const SocketContext = createContext(socket);
 
 export function SocketProvider({
   children,
 }: {
   children: ReactNode;
 }) {
   const { member } = useAuth();
 
   useEffect(() => {
     if (!member?.memberId) return;
 
     socket.connect();
 
     const handleConnect = () => {
       console.log(
         "Socket connected:",
         socket.id
       );
 
       socket.emit(
         "join-member",
         member.memberId
       );
 
       console.log(
         "Joined:",
         `member-${member.memberId}`
       );
     };
 
     socket.on(
       "connect",
       handleConnect
     );
 
     socket.on(
       "disconnect",
       () => {
         console.log(
           "Socket disconnected"
         );
       }
     );
 
     return () => {
       socket.off(
         "connect",
         handleConnect
       );
 
       socket.disconnect();
     };
   }, [member?.memberId]);
 
   return (
     <SocketContext.Provider value={socket}>
       {children}
     </SocketContext.Provider>
   );
 }
 
 
 export function useSocket() {
   return useContext(SocketContext);
 }