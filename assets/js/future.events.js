async function load(){
  let futureEvents = await getFutureEvents();
  getCards(futureEvents);
  getCategories();
};
load();