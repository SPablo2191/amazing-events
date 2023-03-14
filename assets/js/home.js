// let htmlCode = ``;
// getData().events.forEach(function(element){
//     htmlCode =
//     htmlCode +
//     `
//     <div class="card m-2 shadow" style="width: 18rem">
//     <img
//       id="cardImage"
//       src="${element.image}"
//       class="card-img-top"
//       alt="${element.name}"
//       height="150"
//     />
//     <div class="card-body">
//       <h5 class="card-title" id="cardTitle">${element.name}</h5>
//       <p class="card-text" id="cardText">
//       ${element.description}
//       </p>
//     </div>
//     <div class="card-footer border-0">
//       <div class="d-flex justify-content-between">
//         <p id="cardPrice">$${element.price}</p>
//         <button href="./templates/detail.html" class="btn amazeButton" 
//           >See more...</button
//         >
//       </div>
//     </div>
//   </div>
//   `;
// });
// const cards = document.getElementById('cards');
// cards.innerHTML = htmlCode;
getCards(getData().events);