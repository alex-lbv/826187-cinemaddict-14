export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloatNumber = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    throw new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  const random = Math.random() * (max - min) + min;
  return random.toFixed(digits);
};

const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getRandomLengthArray = (array) => {
  getShuffledArray(array.slice(0));

  let randomLengthArray = array.slice(getRandomInteger(0, array.length - 1));

  if (randomLengthArray.length === 0) {
    randomLengthArray = array.slice(getRandomInteger(0, array.length - 1));
  }

  return randomLengthArray;
};

export const getRandomElementOfArray = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

export const generateList = (list) => {
  return getRandomLengthArray(list).slice(0, getRandomInteger(1, list.length - 1));
};

export const numberInRange = (count, rangeMin, rangeMax) => count >= rangeMin && count <= rangeMax;
