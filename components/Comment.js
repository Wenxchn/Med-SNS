import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../constants/Colors'

const Comment = ({ data, postIndex }) => {
  const [loadedReplies, setLoadedReplies] = useState([])

  useEffect(() => {
    const init = async () => {
      try {
        const backend = await AsyncStorage.getItem('posts')
        const currentPost = JSON.parse(backend)[postIndex]
        let commentArr = Object.values(currentPost.comments)
        let filteredCommentsArr = commentArr.filter(
          (comment) => comment.parent_id === data.id
        )
        for (let i = 0; i < 10; i++) {
          if (!filteredCommentsArr[i]) {
            break
          }
          setLoadedReplies((prev) => [...prev, filteredCommentsArr[i]])
        }
      } catch (e) {}
    }
    init()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Ionicons
          name="person-circle"
          size={24}
          color={'#' + ((Math.random() * 0xffffff) << 0).toString(16)}
        />
        <Text style={styles.displayName}>{data.display_name}</Text>
      </View>
      <Text>{data.text}</Text>
      <FlatList
        data={loadedReplies}
        renderItem={({ item }) => (
          <View style={styles.replyMainContainer}>
            <View style={styles.replyTopContainer}>
              <Ionicons
                name="person-circle"
                size={24}
                color={'#' + ((Math.random() * 0xffffff) << 0).toString(16)}
              />
              <Text style={styles.displayName}>{item.display_name}</Text>
            </View>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => {
          return item.created_at
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '5%',
    marginBottom: 15,
  },
  topContainer: { flexDirection: 'row', alignItems: 'center' },
  displayName: {
    fontWeight: 'bold',
    marginLeft: 2,
  },
  replyMainContainer: {
    paddingHorizontal: '5%',
    marginTop: 15,
    borderLeftWidth: 0.5,
    borderLeftColor: COLORS.customGrey2,
  },
  replyTopContainer: { flexDirection: 'row', alignItems: 'center' },
})

export default Comment
