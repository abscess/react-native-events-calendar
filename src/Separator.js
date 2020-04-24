import moment from 'moment'

function format(date) {
  const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(FORMAT_TIME);
};

function separator(events) {
  let tmpListEvent = [];
  let tmpEvent;
  let timeStart;
  let tmpTime;
  let timeEnd;
  let days;
  let currStartTime;
  for(let i = 0; i < events.length; i++) {
    tmpEvent = events[i];

    if (!tmpEvent.end || !tmpEvent.start) {
      tmpListEvent.push(tmpEvent);
      continue;
    };

    timeStart = moment(tmpEvent.start);
    timeEnd = moment(tmpEvent.end);
    
    tmpTime = timeStart;
    timeStart = timeStart < timeEnd ? timeStart : timeEnd;
    timeEnd = timeEnd > tmpTime ? timeEnd : tmpTime;

    days = Math.abs(timeStart.diff(timeEnd, 'days'));
    currStartTime = timeStart;
    do {
      tmpListEvent.push({
        ...tmpEvent,
        start: format(currStartTime),
        end: format(days === 0 ? timeEnd : currStartTime.endOf('day')),
      });

      currStartTime.add(1, 'days').startOf('days');
    } while (days--);

  };

  return tmpListEvent;
}

export default separator;
