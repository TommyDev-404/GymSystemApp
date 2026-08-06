import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  visible: boolean;
  onComplete: () => void;
}

export default function ServerSetupModal({
  visible,
  onComplete,
}: Props) {
  const [ipAddress, setIpAddress] = useState("");

  const saveServer = async () => {
    if (!ipAddress.trim()) {
      Alert.alert("Error", "Please enter server IP");
      return;
    }

    const serverUrl = `http://${ipAddress}:5000`;

    try {
      console.log("SERVER URL:", serverUrl);

      const response = await fetch(`${serverUrl}/health`);

      console.log("STATUS:", response.status);
      console.log("OK:", response.ok);

      const data = await response.json();

      console.log("RESPONSE DATA:", data);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      await AsyncStorage.setItem(
        "SERVER_URL",
        serverUrl
      );

      Alert.alert(
        "Connected",
        `
    URL:
    ${serverUrl}

    Status:
    ${response.status}

    Response:
    ${JSON.stringify(data, null, 2)}
        `
      );

      onComplete();

    } catch (error: any) {
      console.log("CONNECTION ERROR:", error);

      Alert.alert(
        "Connection Failed",
          `
      URL:
      ${serverUrl}

      Error:
      ${error.message}
          `
        );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>
            Connect to Server
          </Text>

          <Text style={styles.description}>
            Enter the laptop IP address where the backend is running.
          </Text>


          <TextInput
            placeholder="192.168.100.209"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numeric"
            style={styles.input}
          />


          <TouchableOpacity
            style={styles.button}
            onPress={saveServer}
          >
            <Text style={styles.buttonText}>
              Connect
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    padding:20
  },

  container:{
    backgroundColor:"white",
    borderRadius:16,
    padding:24
  },

  title:{
    fontSize:22,
    fontWeight:"700",
    marginBottom:10
  },

  description:{
    color:"#666",
    marginBottom:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginBottom:20
  },

  button:{
    backgroundColor:"#10B981",
    padding:14,
    borderRadius:10,
    alignItems:"center"
  },

  buttonText:{
    color:"white",
    fontWeight:"700"
  }

});