import { FlatList, StyleSheet, Text, View } from 'react-native'
import Post from '../components/Post'
import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data = require('../backend/data.json')

const Home = ({ navigation }) => {
  const [loadedPosts, setLoadedPosts] = useState([])
  const amountLoaded = useRef(0)

  useEffect(() => {
    const loadInitialPosts = async () => {
      await AsyncStorage.setItem('posts', JSON.stringify(data))
      let initialPosts = JSON.parse(await AsyncStorage.getItem('posts'))
      amountLoaded.current = 0
      setLoadedPosts([])
      for (let i = 0; i < 10; i++) {
        setLoadedPosts((prev) => [...prev, initialPosts[i]])
        amountLoaded.current = i + 1
      }
    }
    loadInitialPosts()
  }, [])

  const loadNextPosts = async () => {
    const lastAmountLoaded = amountLoaded.current
    const posts = JSON.parse(await AsyncStorage.getItem('posts'))
    for (let i = amountLoaded.current; i < lastAmountLoaded + 10; i++) {
      if (!posts[i]) {
        break
      }
      setLoadedPosts((prev) => [...prev, posts[i]])
      amountLoaded.current = i + 1
    }
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={loadedPosts}
        renderItem={({ item, index }) => (
          <Post data={item} index={index} navigation={navigation} />
        )}
        onEndReached={loadNextPosts}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '8%',
  },
})

export default Home
