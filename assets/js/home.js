async function load(){
    let data = await getData();
    getCards(data.events);
    getCategories();
};
load();