import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealsDetailsScreen from './screens/MealsDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#351401',
        },
        headerTintColor: 'white',
        sceneContainerStyle: {
          backgroundColor: '#3f2f25',
        },
        drawerContentStyle: {
          backgroundColor: '#3f2f25',
        },
        drawerInactiveTintColor: 'white',
        drawerActiveBackgroundColor: 'white',
      }}
    >
      <Drawer.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='star' color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavoritseContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#351401',
              },
              headerTintColor: 'white',
              contentStyle: {
                backgroundColor: '#3f2f25',
              },
            }}
          >
            <Stack.Screen
              name='MealsCategories'
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='MealsOverview'
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   return { title: route.params.categoryTitle };
              // }}
            />
            <Stack.Screen
              name='MealsDetailsScreen'
              component={MealsDetailsScreen}
              options={{
                title: 'About The Meal',
              }}
              // options={{
              //   headerRight: () => {
              //     return <Button title='Tap me' onPress={} />;
              //   },
              // }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritseContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
