import { EXERCISE_API_HOST, EXERCISE_API_KEY } from '@env';

const headers = {
  //'x-rapidapi-host': EXERCISE_API_HOST,
  'x-rapidapi-key': EXERCISE_API_KEY,
};

export const fetchBodyPartList = async () => {
  try {
    const response = await fetch(`https://${EXERCISE_API_HOST}/exercises/bodyPartList`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchExercisesByBodyPart = async (bodyPart) => {
  try {
    const response = await fetch(`https://${EXERCISE_API_HOST}/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    return data.map(({ id, bodyPart, name, target, gifUrl }) => ({ id, bodyPart, name, target, gifUrl }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchExerciseDetails = async (exerciseId) => {
  try {
    const response = await fetch(`https://${EXERCISE_API_HOST}/exercises/exercise/${exerciseId}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
