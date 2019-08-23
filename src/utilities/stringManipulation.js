
import moment from 'moment';

export const formatTimestamp = (timestamp, ago) => {
  if (!timestamp) return '';
  if (ago) {
    return moment(timestamp).fromNow();
  } else {
    return moment(timestamp).format('MMM DD YYYY LT');
  }
};
