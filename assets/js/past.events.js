async function load(){
  let data = await getData();
  const pastEvents = data.events.filter(
    event => Date.parse(event.date) < Date.parse(data.currentDate)
  );
  getCards(pastEvents);
  getCategories();
};
load();