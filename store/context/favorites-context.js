import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export default function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);
  function addFavorite(id) {
    setFavoriteMealIds((prev) => [...prev, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((prev) => prev.filter((mealId) => mealId !== id));
  }
  return (
    <FavoritesContext.Provider
      value={{
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
