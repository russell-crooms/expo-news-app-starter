import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from "@/components/Header";
import SearchBar from '@/components/SearchBar';
import axios from 'axios'
import { NewsDataType } from '@/types';
import { API_KEY } from '@env'; 

type Props = {}

const Page = (props: Props) => {

const {top: safeTop} = useSafeAreaInsets();
const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

useEffect(() => {
  getBreakingNews()
}, [])

const getBreakingNews = async() => {
  try {

    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`
    const response = await axios .get(URL);

    if (response && response.data ) {
      setBreakingNews(response.data.results);
    }
  } catch (err: any) {
    console.log("Error Message: ", err.message);
    console.log("Request URL: ", URL);
  }
};

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar />
      {breakingNews.map((item, index) => (
        <Text>{item.title}</Text>
      ))}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})