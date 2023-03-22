async function load(){
  let pastEvents = await getPastEvents();
  getCards(pastEvents);
  getCategories();
};
load();