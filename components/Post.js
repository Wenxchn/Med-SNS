import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../constants/Colors'

const Post = ({ data }) => {
  useEffect(() => {}, [])
  return (
    <View>
      <View style={styles.post}>
        <Text style={styles.title}>{data.title}</Text>
        <Text numberOfLines={3}>{data.patient_description}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.customGrey,
  },
})

export default Post
