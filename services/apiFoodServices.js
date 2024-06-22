import axios from 'axios';
import { FOOD_API_KEY, FOOD_ID_KEY } from '@env';

// Asigură-te că cheile API sunt definite
if (!FOOD_API_KEY || !FOOD_ID_KEY) {
  throw new Error('API keys are missing. Please check your environment variables.');
}

// Create clients for each endpoint
const parserClient = axios.create({
  baseURL: 'https://api.edamam.com/api/food-database/v2/parser',
  params: {
    app_id: FOOD_ID_KEY,
    app_key: FOOD_API_KEY,
  },
});

const autocompleteClient = axios.create({
  baseURL: 'https://api.edamam.com/auto-complete',
  params: {
    app_id: FOOD_ID_KEY,
    app_key: FOOD_API_KEY,
  },
});

export const searchFoods = async (query) => {
  try {
    const response = await parserClient.get('', {
      params: {
        ingr: query,
        'nutrition-type': 'logging',
      },
    });

    if (!response.data || !response.data.parsed) {
      throw new Error('Invalid response structure');
    }

    return response.data.parsed.map((item) => ({
      food: item.food,
      nutrients: {
        CA: item.food.nutrients.CA,
        CHOCDF_net: item.food.nutrients['CHOCDF.net'],
        CHOLE: item.food.nutrients.CHOLE,
        ENERC_KCAL: item.food.nutrients.ENERC_KCAL,
        FAMS: item.food.nutrients.FAMS,
        FAPU: item.food.nutrients.FAPU,
        FASAT: item.food.nutrients.FASAT,
        FATRN: item.food.nutrients.FATRN,
        FIBTG: item.food.nutrients.FIBTG,
        FOLDFE: item.food.nutrients.FOLDFE,
        FOLFD: item.food.nutrients.FOLFD,
        FOLAC: item.food.nutrients.FOLAC,
        FE: item.food.nutrients.FE,
        MG: item.food.nutrients.MG,
        NIA: item.food.nutrients.NIA,
        P: item.food.nutrients.P,
        K: item.food.nutrients.K,
        PROCNT: item.food.nutrients.PROCNT,
        RIBF: item.food.nutrients.RIBF,
        NA: item.food.nutrients.NA,
        SUGAR: item.food.nutrients.SUGAR,
        THIA: item.food.nutrients.THIA,
        FAT: item.food.nutrients.FAT,
        VITA_RAE: item.food.nutrients.VITA_RAE,
        VITB12: item.food.nutrients.VITB12,
        VITB6A: item.food.nutrients.VITB6A,
        VITC: item.food.nutrients.VITC,
        VITD: item.food.nutrients.VITD,
        VITK1: item.food.nutrients.VITK1,
        ZN: item.food.nutrients.ZN,
      },
    }));
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw error;
  }
};

export const getAutocompleteSuggestions = async (query) => {
  try {
    const response = await autocompleteClient.get('', {
      params: {
        q: query,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error;
  }
};
