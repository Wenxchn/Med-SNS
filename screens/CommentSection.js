import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../constants/Colors'

const CommentSection = ({ route }) => {
  useEffect(() => {
    const init = async () => {
      const index = route.params.index
      const backend = await AsyncStorage.getItem('posts')
      const currentPost = JSON.parse(backend)[index]
    }
    init()
  }, [])

  return <View style={styles.screen}></View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '8%',
  },
})

export default CommentSection
