import dayjs from 'dayjs';
import {getRandomInteger} from './utils/common.js';

export const getDuration = (duration, inHours = true) => {
  const totalDurations = dayjs.duration(duration, 'minutes');
  return (inHours) ? totalDurations.hours() : totalDurations.minutes();
};

export const getDate = (productionYear, format) => {
  return dayjs(productionYear).format(format);
};

export const getCommentDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD/ hh:mm');
};

export const generateDate = () => {
  const maxStepGap = 1000;
  const stepGap = getRandomInteger(-maxStepGap, maxStepGap);

  return dayjs().add(stepGap, 'year').add(stepGap, 'day').add(stepGap, 'minute').toDate();
};
