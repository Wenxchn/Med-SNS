import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const MainStack = createNativeStackNavigator()

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
    </MainStack.Navigator>
  )
}

export default MainNavigator
