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
async function getUpcomingEvents(){
    let futureEvents = await getFutureEvents();
    let categories = await getCategoryData();
    let tbody = document.getElementById('futureEvent');
    let htmlCode = ``;
    categories.forEach(category=>{
        htmlCode += `
        <tr>
        <td>${category}</td>
        <td>Revenues</td>
        <td>Percentage of attendance</td>
      </tr>
        `;
    });
    console.log(htmlCode);
    tbody.innerHTML = htmlCode;
}
getAttendance();
getCapacity();
getUpcomingEvents();