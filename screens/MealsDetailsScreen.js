import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { MEALS } from '../data/dummy-data';
import { useContext, useLayoutEffect } from 'react';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealsDetailsScreen({ navigation, route }) {
  const mealId = route.params.mealId;
  const meal = MEALS.find((meal) => meal.id === mealId);
  // const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      // favoriteMealsContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsContext.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color='white'
          />
        );
      },
    });
  }, [mealId, navigation, headerButtonPressHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: meal.imageUrl }} />
      <Text style={styles.title}>{meal.title}</Text>
      <MealDetails
        textStyle={styles.detailText}
        duration={meal.duration}
        complexity={meal.complexity}
        affordability={meal.affordability}
      />
      <View style={styles.listOutterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={meal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={meal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealsDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 315,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listContainer: {
    maxWidth: '80%',
  },
  listOutterContainer: {
    alignItems: 'center',
  },
});
