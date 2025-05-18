const BASE_URL = "https://api.frankfurter.app/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amt.value = "1";
    }

    const URL = `${BASE_URL}amount=${amtval}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = parseFloat(data.rates[toCurr.value]).toFixed(2); 
    
    msg.innerText = `${amtval} ${fromCurr.value} = ${rate} ${toCurr.value}`
};


window.addEventListener("load", () => {
    updateExchangeRate();
})