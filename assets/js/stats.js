async function getAttendance(){
    let data = await getData();
    let highAttendance = 0;
    let highCapacity = 0;
    let lowCapacity = 0;
    let lowAttendance = Infinity;
    let eventHighAttendance = null;
    let eventLowAttendance = null;
    data.events.forEach(element => {
        if(parseInt(element.assistance) > highAttendance){
            highAttendance = element.assistance;
            eventHighAttendance = element.name;
            highCapacity = element.capacity;
        }
        if(parseInt(element.assistance) < lowAttendance){
            lowAttendance = element.assistance;
            lowCapacity = element.capacity;
            eventLowAttendance = element.name;
        } 
    });
    let eventHighCell = document.getElementById('highAttendance');
    let eventLowCell = document.getElementById('lowAttendance');
    eventHighCell.innerHTML = `<p>${eventHighAttendance} (${Math.round(highAttendance/highCapacity*100)}%)</p>`;
    eventLowCell.innerHTML = `<p>${eventLowAttendance} (${Math.round(lowAttendance/lowCapacity*100)}%)</p>`
};
async function getCapacity(){
    let data = await getData();
    let highCapacity = 0;
    let eventCapacity = null;
    data.events.forEach(element => {
        if(parseInt(element.capacity) > highCapacity){
            highCapacity = element.capacity;
            eventCapacity = element.name;
        }
    });
    let eventHighCell = document.getElementById('capacity');
    eventHighCell.innerHTML = `<p>${eventCapacity} (${highCapacity})</p>`;
};
async function getUpcomingEventsStats(){
    let futureEvents = await getFutureEvents();
    let categories = await getCategoryData();
    let tbody = document.getElementById('futureEvent');
    let htmlCode = ``;
    let tableRows = [];
    categories.forEach(category => {
        let revenue = 0;
        let totalEstimate = 0;
        let totalCapacity = 0;
        futureEvents.forEach(event =>{
            if(event.category === category){
                console.log(event.name,"entro",revenue,event.price,event.estimate);
                revenue += parseInt(event.price)*parseInt(event.estimate);
                totalEstimate += event.estimate;
                totalCapacity += event.capacity;
                console.log(revenue);
            }
        });
        console.log(revenue);
        tableRows.push({
            category : category,
            revenue : revenue,
            percentageAttendance : Math.round(totalEstimate/totalCapacity*100)
        });
    });
    tableRows.forEach(tableRow=>{
        if(isNaN(tableRow.percentageAttendance)){
            htmlCode += `
            <tr>
            <td>${tableRow.category}</td>
            <td>$${tableRow.revenue}</td>
            <td>0%</td>
          </tr>
            `;
            return;
        }
        htmlCode += `
        <tr>
        <td>${tableRow.category}</td>
        <td>$${tableRow.revenue}</td>
        <td>${tableRow.percentageAttendance}%</td>
      </tr>
        `;
    });
    console.log(htmlCode);
    tbody.innerHTML = htmlCode;
}
async function getPastEventsStats(){
    let futureEvents = await getPastEvents();
    let categories = await getCategoryData();
    let tbody = document.getElementById('pastEvent');
    let htmlCode = ``;
    let tableRows = [];
    categories.forEach(category => {
        let revenue = 0;
        let totalAssistance = 0;
        let totalCapacity = 0;
        futureEvents.forEach(event =>{
            if(event.category === category){
                console.log(event.name,"entro",revenue,event.price,event.assistance);
                revenue += parseInt(event.price)*parseInt(event.assistance);
                totalAssistance += event.assistance;
                totalCapacity += event.capacity;
                console.log(revenue);
            }
        });
        console.log(revenue);
        tableRows.push({
            category : category,
            revenue : revenue,
            percentageAttendance : Math.round(totalAssistance/totalCapacity*100)
        });
    });
    tableRows.forEach(tableRow=>{
        if(isNaN(tableRow.percentageAttendance)){
            htmlCode += `
            <tr>
            <td>${tableRow.category}</td>
            <td>$${tableRow.revenue}</td>
            <td>0%</td>
          </tr>
            `;
            return;
        }
        htmlCode += `
        <tr>
        <td>${tableRow.category}</td>
        <td>$${tableRow.revenue}</td>
        <td>${tableRow.percentageAttendance}%</td>
      </tr>
        `;
    });
    console.log(htmlCode);
    tbody.innerHTML = htmlCode;
}
getAttendance();
getCapacity();
getUpcomingEventsStats();
getPastEventsStats();