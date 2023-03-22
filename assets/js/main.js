async function  getData(){
  let url = "https://mindhub-xj03.onrender.com/api/amazing";
  const response =  await fetch(url);
  return await response.json();
};
async function getCategoryData(){
  let data = await getData();
  let categoriesRepeated = data.events.map((element) => element.category);
  let categories = [...new Set(categoriesRepeated)];
  return categories;
}
async function getCategories() {
  let htmlCheckboxes = '';
  let id = 0;
  let categories = await getCategoryData();
  categories.forEach(function(element){
    htmlCheckboxes += `
    <div class="form-check mx-2">
    <input
      class="form-check-input amazeCheck"
      type="checkbox"
      value="${element}"
      name="check${id}"
      id="amazeChecks"
    />
    <label class="form-check-label text-center" for="flexCheckDefault">
      ${element}
    </label>
  </div>
    `;
    id++;
  });
  const checks = document.getElementById('checks');
  checks.innerHTML = htmlCheckboxes;
}
function getCards(data) {
  let htmlCode = ``;
  
  data.forEach(function(element){
    htmlCode =
    htmlCode +
    `
    <div class="card m-2 shadow" style="width: 18rem" id="${element._id}">
    <img
      id="cardImage"
      src="${element.image}"
      class="card-img-top"
      alt="${element.name}"
      height="150"
    />
    <div class="card-body">
      <h5 class="card-title" id="cardTitle">${element.name}</h5>
      <p class="card-text" id="cardText">
      ${element.description}
      </p>
    </div>
    <div class="card-footer border-0">
      <div class="d-flex justify-content-between">
        <p id="cardPrice">$${element.price}</p>
        <button href="./templates/detail.html" class="btn amazeButton" onclick="setDetail(${element._id})"
          >See more...</button
        >
      </div>
    </div>
  </div>
  `;
});
const cards = document.getElementById('cards');
cards.innerHTML = htmlCode;
};


async function setDetail(id) {
  let data = await getData();
  let event = data.events.find(event => event._id == id);
  localStorage.setItem("detail", JSON.stringify(event));
  location.href = "/templates/detail.html";
}

async function filter() {
  var inputSearch = document.getElementById('inputSearch').value;
  var inputChecks = document.getElementsByClassName('amazeCheck');
  let selectedChecks = [];
  for (let item of inputChecks) {
    if(item.checked){
      selectedChecks.push(item.value);
    };
  };
  let data = await getData();
  if(selectedChecks.length != 0 && inputSearch){
    return ;
  }
  if(inputSearch && selectedChecks.length == 0){
    let filteredEvents = data.events.filter((element) => element.name === inputSearch );
    console.log(filteredEvents);
    getCards(filteredEvents);
    return;
  }
  if(!inputSearch && selectedChecks.length != 0){
    console.log("entro a checks",data.events);
    let filteredEvents = data.events.filter((element) => selectedChecks.includes(element.category));
    getCards(filteredEvents);
    return ;
  }
    let filteredEvents = data.events.filter((element) => element.name === inputSearch && selectedChecks.includes(element.category));
    getCards(filteredEvents);
}

async function getFutureEvents() {
  let data = await getData();
  const futureEvents = data.events.filter(
    event => Date.parse(event.date) > Date.parse(data.currentDate)
  );
  return futureEvents;
};
async function getPastEvents() {
  let data = await getData();
  const pastEvents = data.events.filter(
    event => Date.parse(event.date) < Date.parse(data.currentDate)
  );
  return pastEvents;
};