import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { firebase } from "../../config";
  import { ScrollView } from "react-native";
  
  const Login = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    loginUser = async (email, password) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        
      } catch (error) {
        alert(error);
      }
    };
  
    // forget password
    const forgetPassword = () => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Password reset email sent!");
        })
        .catch((error) => {
          alert(error);
        });
    };
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View  style={styles.container}>
          <Text className="text-5xl font-bold text-[#00CCBB]">Login</Text>
          <View className="mx-5 px-15 mt-12 ">
            <TextInput 
              className="bg-gray-200 w-96 pt-3 pb-3 p-5 rounded-full"
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View className="mt-5">
            <TextInput
              className="bg-gray-200 w-96 pt-3 pb-3 p-5 rounded-full"
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            className='rounded-full bg-[#00CCBB] py-4 px-14 mt-10 mb-5'
            onPress={() => loginUser(email, password) }
            
            
          >
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row"
            onPress={() => navigation.navigate("Registration")}
            style={{ marginTop: 20 }}
          >
            <Text className="text-gray-500 text-lg  ml-16" >
              Don't have an account?                           
            </Text>
            <Text className="text-[#00CCBB] text-lg flex-1 font-bold">     Sign up here             </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              forgetPassword();
            }}
            style={{ marginTop: 20 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 70,
    },
    textInput: {
      paddingTop: 20,
      paddingBottom: 10,
      width: 400,
      fontSize: 20,
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginBottom: 10,
      textAlign: "center",
    },
    button: {
      marginTop: 50,
      height: 70,
      width: 250,
      backgroundColor: "#000",
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
  });
  