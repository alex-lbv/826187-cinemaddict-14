import dayjs from 'dayjs';
import {getRandomInteger} from './utils.js';

export const getDuration = (duration, inHours = true) => {
  const totalDurations = dayjs.duration(duration, 'minutes');
  return (inHours) ? totalDurations.hours() : totalDurations.minutes();
};

export const getDate = (productionYear, full = true) => {
  return (full)
    ? dayjs(productionYear).format('D MMMM YYYY')
    : dayjs(productionYear).format('YYYY');
};

export const getCommentDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD/ hh:mm');
};

export const generateDate = () => {
  const maxStepGap = 1000;
  const stepGap = getRandomInteger(-maxStepGap, maxStepGap);

  return dayjs().add(stepGap, 'year').add(stepGap, 'day').add(stepGap, 'minute').toDate();
};
