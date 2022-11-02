       //darkmode

function switchdarklightmode() {
    const switchmode = document.body;
    switchmode.classList.toggle("dark");
}

const switchmode = document.getElementById("darkmodebutton");
switchmode.addEventListener("click", switchdarklightmode);




