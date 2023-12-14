import { StyleSheet, Text, View } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { useContext } from 'react';
import { FavoritesContext } from '../store/context/favorites-context';
import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';

function FavoritesScreen() {
  // const favoritesContext = useContext(FavoritesContext);
  const favoritesMealIds = useSelector((state) => state.favoriteMeals.ids);
  const favoiteMeals = MEALS.filter((meal) =>
    favoritesMealIds?.includes(meal.id)
  );
  if (favoiteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorites meals yet.</Text>
      </View>
    );
  }
  return <MealsList items={favoiteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    felx: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});
