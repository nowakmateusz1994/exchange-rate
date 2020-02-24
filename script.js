let api = 'http://api.nbp.pl/api/exchangerates/tables/c/'
let table = document.querySelector('.table');

function showTable(table){
 let tableArray = table[0].rates;
 let date = table[0].effectiveDate; 
 console.log(date)
}


function getCurrentRate(api){
    fetch(api)
    .then(rate => rate.json())
    .then(rate => showTable(rate));
}

getCurrentRate(api);