import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../constants/Colors'
import Comment from '../components/Comment'

const CommentSection = ({ route }) => {
  const [loadedComments, setLoadedComments] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const init = async () => {
      try {
        setLoadedComments([])
        const index = route.params.index
        const backend = await AsyncStorage.getItem('posts')
        const currentPost = JSON.parse(backend)[index]
        setTitle(currentPost.title)
        setDescription(currentPost.patient_description)
        let commentArr = Object.values(currentPost.comments)
        for (let i = 0; i < 10; i++) {
          if (!commentArr[i]) {
            break
          }

          if (commentArr[i].parent_id === null) {
            setLoadedComments((prev) => [...prev, commentArr[i]])
          }
        }
      } catch (e) {}
    }
    init()
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.post}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        }
        data={loadedComments}
        renderItem={({ item }) => (
          <Comment data={item} postIndex={route.params.index} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return item.created_at
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  post: {
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.customGrey,
    marginBottom: 15,
  },
})

export default CommentSection
