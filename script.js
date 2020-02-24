let api = 'http://api.nbp.pl/api/exchangerates/tables/c/'
let table = document.querySelector('.table');

function creatDivWithClass(value, ...className) {
    let div = document.createElement('div');
    className.forEach(element => {
        div.classList.add(element);
    });
    div.innerText = value;
    table.appendChild(div);
}

function showTable(rate) {
    let tableArray = rate[0].rates;
    let date = rate[0].effectiveDate;
    creatDivWithClass(date, "header");
    creatDivWithClass('Nazwa Waluty', "currency", 'title');
    creatDivWithClass('Kod', "code", 'title');
    creatDivWithClass('Kupno', "bid", 'title');
    creatDivWithClass('Sprzedaż', "ask", 'title');

    tableArray.forEach(element => {
        creatDivWithClass(element.currency, "currency");
        creatDivWithClass(element.code, "code");
        creatDivWithClass(element.bid, "bid");
        creatDivWithClass(element.ask , "ask");
    });

}


function getCurrentRate(api) {
    fetch(api)
        .then(rate => rate.json())
        .then(rate => showTable(rate));
}

getCurrentRate(api);