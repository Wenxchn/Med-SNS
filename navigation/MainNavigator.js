import { Pressable } from 'react-native'
import CommentSection from '../screens/CommentSection'
import Home from '../screens/Home'

import Ionicons from '@expo/vector-icons/Ionicons'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const MainStack = createNativeStackNavigator()

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={({ route, navigation }) => ({
          headerTitle: 'Meddit',
        })}
      />
      <MainStack.Screen
        name="CommentSection"
        component={CommentSection}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: null,
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="close-sharp" size={32} color="black" />
              </Pressable>
            )
          },
        })}
      />
    </MainStack.Navigator>
  )
}

export default MainNavigator
