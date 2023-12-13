import { FlatList, View, StyleSheet } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealItem from '../components/MealItem';
import { useLayoutEffect } from 'react';

function MealsOverviewScreen({ route, navigation }) {
  function renderMealItem(dataItem) {
    const item = dataItem.item;
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      duration: item.duration,
      complexity: item.complexity,
      id: item.id,
    };
    return (
      <MealItem
        title={dataItem.item.title}
        imageUrl={dataItem.item.imageUrl}
        affordability={mealItemProps.affordability}
        duration={mealItemProps.duration}
        complexity={mealItemProps.complexity}
        id={mealItemProps.id}
      ></MealItem>
    );
  }
  const catId = route.params.categoryId;
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => {
      return category.id === catId;
    }).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(dataItem) => dataItem.id}
        renderItem={(dataItem) => renderMealItem(dataItem)}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
