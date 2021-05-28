import {getRandomInteger} from './common.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatDuration = (min) => {
  const HOUR = 60;

  if (min < HOUR) {
    return min + 'm';
  } else {
    const hours = Math.floor(min / HOUR);
    const minutes = min % HOUR;
    return hours + 'h ' + minutes + 'm';
  }
};

export const generateDate = () => {
  const maxStepGap = 1000;
  const stepGap = getRandomInteger(-maxStepGap, maxStepGap);

  return dayjs().add(stepGap, 'year').add(stepGap, 'day').add(stepGap, 'minute').toDate();
};

export const formatReleaseDate = (releaseDate) => {
  return dayjs(releaseDate).format('DD MMMM YYYY');
};

export const humanize = (date) => {
  return dayjs(date).fromNow();
};
