import dayjs from 'dayjs';

export const MAX_LENGTH_SHORT_DESCRIPTION = 140;

export const sortDate = (movieA, movieB) => {
  return dayjs(movieA.productionYear).diff(dayjs(movieB.productionYear));
};

export const sortRating = (movieA, movieB) => {
  return dayjs(movieB.rating).diff(dayjs(movieA.rating));
};

