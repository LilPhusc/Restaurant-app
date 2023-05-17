import 'react-native-url-polyfill/auto';
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    UserIcon,
    SearchIcon,
    AdjustmentsIcon,
    ChevronUpDownIcon,
    ChevronDownIcon,
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline"
import { SearchBar } from 'react-native-screens'
import { ScrollView } from 'react-native'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import  createClient  from '../sanity'
import 'react-native-url-polyfill/auto'
import client from '../sanity';
import Login from './startScreens/Login';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    })
}, [])
    useEffect(() => {
    client.fetch(
    `   *[_type == "featured"] {
            ...,
        restaurant[] -> {
            ...,
            dishes[] -> ,
        },
        }
    `
    ).then((data) =>{
        setFeaturedCategories(data);
    
    });
    
}, []);

return (
    <SafeAreaView className="bg-white pt-5">

        <View className='flex-row pb-3 items-center mx-4 space-x-2 '>
            <Image
                source={{
                    uri: 'https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450'
                }}
                className='h-7 w-7 bg-gray-300 rounded-full'
            />
            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">Welcome Back!</Text>
                <Text className="font-bold text-xl">Current Location    
                    <Text> </Text><ChevronDownIcon size={20} color="#00CCBB" />
                </Text>
            </View>
            <UserIcon onPress={()=>{navigation.navigate("Profile")}} size={35} color="#00CCBB" />
            
        </View>

        <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
            <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-lg'>
                <MagnifyingGlassIcon color="gray" size={20} />
                <TextInput placeholder='Restaurants and cuisines'
                    keyboardType='default' />
            </View>

            <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        <ScrollView className="bg-gray-100 "
            contentContainerStyle={{
                paddingBottom: 100
            }}
        >
            <Categories />
            {featuredCategories?.map((category) =>(
                
            
            <FeaturedRow
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
                
            />
        ))}
            <View className="mt-6"></View>
        </ScrollView>

    </SafeAreaView>
)
}

export default HomeScreen