import { FlatList, StyleSheet, Text, View } from 'react-native'
import COLORS from '../constants/Colors'
import Post from '../components/Post'
import { useEffect, useRef, useState } from 'react'

const data = require('../backend/data.json')

const Home = () => {
  const [loadedPosts, setLoadedPosts] = useState([])
  const amountLoaded = useRef(0)

  useEffect(() => {
    const loadInitialPosts = () => {
      amountLoaded.current = 0
      setLoadedPosts([])
      for (let i = 0; i < 10; i++) {
        setLoadedPosts((prev) => [...prev, data[i]])
        amountLoaded.current = i + 1
      }
    }
    loadInitialPosts()
  }, [])

  const loadNextPosts = () => {
    const lastAmountLoaded = amountLoaded.current
    for (let i = amountLoaded.current; i < lastAmountLoaded + 10; i++) {
      if (!data[i]) {
        break
      }
      setLoadedPosts((prev) => [...prev, data[i]])
      amountLoaded.current = i + 1
    }
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={loadedPosts}
        renderItem={({ item }) => <Post data={item} />}
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
