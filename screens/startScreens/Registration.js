import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  import { firebase } from "../../config";
  import { ScrollView } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  
  const Registration = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    registerUser = async (email, password, firstName, lastName) => {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              firstName,
              lastName,
              email,
              uid: firebase.auth().currentUser.uid,
              profile:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            });
        })
        .catch((error) => {
          alert(error);
        });
    };
  // 
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style className="text-5xl font-bold text-[#00CCBB]">Register</Text>
          <View className="mx-5 px-15 mt-12 mb-5">
            <TextInput
              className="bg-gray-200 w-96 pt-3 pb-3 p-5 rounded-full"
              placeholder="First Name"
              onChangeText={(firstName) => setFirstName(firstName)}
              autoCorrect={false}
            />
            </View>
            <View className="mb-5">
            <TextInput
              className="bg-gray-200 w-96 pt-3 pb-3 p-5 rounded-full"
              placeholder="Last Name"
              onChangeText={(lastName) => setLastName(lastName)}
              autoCorrect={false}
            />
            </View>
            <View className="mb-5">
            <TextInput
              className="bg-gray-200 w-96 pt-3 pb-3 p-5 rounded-full"
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            </View>
            <View className="mb-5">
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
            onPress={() => registerUser(email, password, firstName, lastName)}
            className='rounded-full bg-[#00CCBB] py-4 px-14 mt-10 mb-8'
          >
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity // chay lai di vo duoc roi ne
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 5 }}
          >
            <Text className='text-lg font-bold text-[#00CCBB]'>
                        <Text className= 'text-gray-500 font-light'>Already have an account?</Text>   Login here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  export default Registration;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
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
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      marginBottom: 20,
    },
  });
  