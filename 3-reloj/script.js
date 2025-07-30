const clock = document.querySelector("#clock");


function updateClock(){
    let dateObj = new Date();

    let hours = dateObj.getHours().toString().padStart(2, "0");
    let minutes = dateObj.getMinutes().toString().padStart(2, "0");
    let seconds = dateObj.getSeconds().toString().padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;


}

updateClock();

setInterval(updateClock, 100);