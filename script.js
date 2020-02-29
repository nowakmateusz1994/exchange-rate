let api = 'http://api.nbp.pl/api/exchangerates/tables/c/'
let table = document.querySelector('.table');
let date = null;
let tableArray = null;

let currencyList = document.querySelector('.converter .cod');
let converterSubmit = document.querySelector('button.submit');
let converterOption = document.querySelector('select.option');
let converterInput = document.querySelector('.converter input');
let converterInfo = document.querySelector('.converter span')

function addOptions(optionsArray) {

    optionsArray.forEach((element, index) => {
        let option = document.createElement('option');
        option.innerText = element.code;
        option.value = index;
        currencyList.appendChild(option);
    });
}

function converterCurrency() {
    if (converterOption.value == 'bouy') {
        converterInfo.innerText =`Aby kupić ${converterInput.value} ${tableArray[currencyList.value].code} potrzebujesz  ${(tableArray[currencyList.value].ask*converterInput.value).toFixed(2)} PLN `; 
    } else if (converterOption.value == 'sell') {
        converterInfo.innerText =`Za ${converterInput.value} ${tableArray[currencyList.value].code} dostaniesz ${(tableArray[currencyList.value].bid*converterInput.value).toFixed(2)} PLN`;
    }
}

function creatDivWithClass(parent, value, ...className) {
    let div = document.createElement('div');
    className.forEach(element => {
        div.classList.add(element);
    });
    div.innerText = value;
    parent.appendChild(div);
    return div;
}

function showTable(rate) {
    tableArray = rate[0].rates;
    date = rate[0].effectiveDate;
    creatDivWithClass(table, date, "header");
    let wrap = creatDivWithClass(table, null, "wrap");
    creatDivWithClass(wrap, 'Nazwa Waluty', "currency", 'title');
    creatDivWithClass(wrap, 'Kod', "code", 'title');
    creatDivWithClass(wrap, 'Kupno', "bid", 'title');
    creatDivWithClass(wrap, 'Sprzedaż', "ask", 'title');

    tableArray.forEach(element => {
        let parent = creatDivWithClass(table, null, "wrap");
        creatDivWithClass(parent, element.currency, "currency");
        creatDivWithClass(parent, element.code, "code");
        creatDivWithClass(parent, element.bid, "bid");
        creatDivWithClass(parent, element.ask, "ask");
    });

    addOptions(tableArray);
}


function getCurrentRate(api) {
    fetch(api)
        .then(rate => rate.json())
        .then(rate => showTable(rate));
}


getCurrentRate(api);
converterSubmit.addEventListener('click', converterCurrency)