async function load(){
  let data = await getData();
  const futureEvents = data.events.filter(
    event => Date.parse(event.date) > Date.parse(data.currentDate)
  );
  getCards(futureEvents);
  getCategories();
};
load();