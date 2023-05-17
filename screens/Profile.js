import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { QuerySnapshot, collection, doc, getDocs } from "firebase/firestore";

import { firebase } from "../config";

import { ScrollView, NativeModules } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Login from "./startScreens/Login";
import { onValue, ref } from "@firebase/database";
import Restart from 'react-native-restart';
import CodePush from 'react-native-code-push';


const Profile = () => {
  const navigation = useNavigation();

  const [name,setName]=useState([]);
  const handleReload = () => {
    NativeModules.DevSettings.reload();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
          
        } else {
          console.log("does not exist");
        }
      });
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style className="text-5xl font-bold text-[#00CCBB]">Your Profile</Text>

        <View className="mb-5 mt-12 text-justify">
          <View className=''>
          <Text className=" font-bold text-white rounded-xl text-center bg-[#00CCBB] text-lg  mb-4">First Name:</Text>
          </View>
          <Text className="text-center text-lg mb-4">{name.firstName}</Text>
          
          <View>
          <Text className=" font-bold text-white rounded-xl text-center bg-[#00CCBB] text-lg  mb-4">Last Name:</Text>
          </View>
          <Text className="text-center text-lg mb-4">{name.lastName}</Text>
          
          <View>
          <Text className=" font-bold text-white rounded-xl text-center bg-[#00CCBB] text-lg  mb-4">Email:</Text>
          </View>
          <Text className="text-center text-lg mb-4">{name.email}</Text>
          </View> 
         
        
        <TouchableOpacity
          onPress={handleReload}
          className='rounded-full bg-[#00CCBB] py-4 px-14 mt-10 mb-8'
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
            Log out
          </Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

export default Profile;

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
