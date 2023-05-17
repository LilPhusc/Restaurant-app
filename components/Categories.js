import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../sanity';
import category from '../e-eating/schemas/category';

const Categories = () => {
  const[Categories,setCategories]=useState([]);


  useEffect(() =>{
    client.fetch(
    `
    *[_type == "category"]
    `
    ).then((data)=>{
      setCategories(data);
    });
    console.log(Categories);
  },[]);

  return (
    <ScrollView 
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
    {Categories.map((category) => (
      <CategoryCard 
      key={category._id}
      imgUrl={urlFor(category.image).width(200).url()}
      title={category.name}
      />
    ))}

    </ScrollView>
  );
};

export default Categories