import { apiClient } from "../api/ApiClient";

export function getAllDistinctCategoriesWithCollectionName(collections = []) {
  if (!Array.isArray(collections) || collections.length === 0) {
    return [];
  }

  const result = [];

  collections.forEach(collection => {
    const collectionName = collection.name;
    
    // Add parent categories from this collection
    if (Array.isArray(collection.categories)) {
      collection.categories.forEach(category => {
        // Add the main category
        result.push({
          id: category.id,
          name: category.name,
          name_url: category.name_url,
          image_url: category.image_url,
          collection: collectionName,
        });
      });
    }
  });

  return result;
}


export const setLanguage = (lang) => {
  if (lang) {
    localStorage.setItem("lang", lang);
    apiClient.defaults.headers.common["Accept-Language"] = lang;
  }
};

// get current language
export const getLanguage = () => {
  return localStorage.getItem("lang") || "en";
};
