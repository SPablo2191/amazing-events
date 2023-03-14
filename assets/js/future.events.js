let data = getData();
const pastEvents = data.events.filter(
  event => Date.parse(event.date) > Date.parse(data.currentDate)
);
getCards(pastEvents);
