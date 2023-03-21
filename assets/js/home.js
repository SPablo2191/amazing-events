async function load(){
    let data = await getData();
    console.log(data);
    getCards(data.events);
    getCategories();
};
load();