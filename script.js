let api = 'http://api.nbp.pl/api/exchangerates/tables/c/'
let table = document.querySelector('.table');

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
    let tableArray = rate[0].rates;
    let date = rate[0].effectiveDate;
    creatDivWithClass(table, date ,"header");
    let wrap = creatDivWithClass(table, null, "wrap");
    creatDivWithClass(wrap,'Nazwa Waluty', "currency", 'title');
    creatDivWithClass(wrap, 'Kod', "code", 'title');
    creatDivWithClass(wrap,'Kupno', "bid", 'title');
    creatDivWithClass(wrap,'Sprzedaż', "ask", 'title');

    tableArray.forEach(element => {
        let parent = creatDivWithClass(table, null, "wrap");
        creatDivWithClass(parent, element.currency, "currency");
        creatDivWithClass(parent, element.code, "code");
        creatDivWithClass(parent, element.bid, "bid");
        creatDivWithClass(parent, element.ask , "ask");
    });

}


function getCurrentRate(api) {
    fetch(api)
        .then(rate => rate.json())
        .then(rate => showTable(rate));
}

getCurrentRate(api);