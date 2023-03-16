var detail = JSON.parse(localStorage.getItem('detail'));
console.log(detail);
let htmlDetailCard = document.getElementById('detail');
htmlDetailCard.innerHTML = `
<div class="row g-0">
<div class="col-md-4">
  <img src="${detail.image}" class="img-fluid rounded-start h-100 w-100" alt="${detail.name}"  id="detail-image"/>
</div>
<div class="col-md-8 py-4">
  <div class="card-body">
    <h5 class="card-title">${detail.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">
    <small class="text-muted">${detail.category}</small>
  </h6>
    <p class="card-text">${detail.description}</p>
    <p class="card-text">
    Place: ${detail.place}
  </p>
    <p class="card-text">
      <small class="text-muted">${detail.date}</small>
    </p>
  </div>
</div>
</div>
`;


