// import { country } from '../server/server.js'

// Listen for submit
const amount = document.getElementById('amount');
amount.value = '';
let down = document.getElementById('down');
let tries = document.getElementById('tries');
let k = 3;

let reload = document.getElementById('reload');

let generated = document.getElementById("generated");

// trying to fetch data

// const data = new FormData(form);
// https://zero7052023.onrender.com
const response = await fetch('https://zero7052023.onrender.com', {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
    }
})

let country;
let riddle;

if (response.ok) {
    const data = await response.json();
    riddle = data.bot // trims any trailing spaces/'\n' ;
    country = data.message;
    console.log(riddle);
    console.log(country)
} else {
    const err = await response.text()

    console.log("Something went wrong")
    console.log(err)
}

generated.innerHTML = `${riddle}`;

amount.disabled = true;
// generated.innerHTML = riddle;
amount.disabled = false;
down.classList = "lol card card-body text-center mt-5";
console.log(country);
let c = 1;
if (generated.innerHTML !== '*Генерация страны*') {
  document.getElementById('forn-group').innerHTML = `<input type="submit" value="Угадать!" class="guess btn btn-info btn-block mb-1 mt-2" id="btn">
  <a href="./map.html" class="redirect nounderline "><input type="button" value="Угадать на карте!" class="guess btn btn-info btn-block" id="map"></a>
  `
}

document.getElementById('btn').addEventListener('click', function(e){
    e.preventDefault();
    c = c - 1;
    amount.disabled = false;
    //Hide results
    document.getElementById('results').style.display='none';

    if (c <= 0) {
      //Show loader
      // document.getElementById('loading').style.display='block';
      setTimeout(calculateResults);
    }
  });
  
  // Calculate Results
  function calculateResults(){
    // UI Vars
    const monthlyPayment = document.getElementById('monthly-payment');
    monthlyPayment.classList = "form-control text-light"
    
    const answer = country.toLowerCase();
    const principal = amount.value.toLowerCase();

    if (principal === answer) {
        amount.disabled = true;
        document.getElementById('btn').disabled = true;
        monthlyPayment.value =`Да! Это ${country}`;
        monthlyPayment.classList.add("bg-success");
        monthlyPayment.classList.add("tries-success");
        tries.innerHTML = 'Вы выиграли!';
        document.getElementById('tryAgain').innerHTML += `<input type="submit" value="Попробовать ещё!" class="yellow guess text-dark btn btn-warning btn-block mb-1 mt-3" id="reloadBtn">`;
        document.getElementById('reloadBtn').addEventListener('click', () =>
        setTimeout(function(){
            window.location.reload();
          })
        )
        
    } else {
        monthlyPayment.value =`Нет...`;
        monthlyPayment.classList.add("bg-danger");
        k = k - 1
        tries.innerHTML = `Осталось попыток: ${k}`;
        if (k === 0) {
            amount.disabled = true;
            document.getElementById('btn').disabled = true;
            tries.innerHTML = 'Вы проиграли!';
            monthlyPayment.value =`Нет... Это ${country}`;
            monthlyPayment.classList.add("bg-danger");
            monthlyPayment.classList.add("tries-failure");
            monthlyPayment.classList.add("border-danger");
            document.getElementById('tryAgain').innerHTML += `<input type="submit" value="Попробовать ещё!" class="yellow guess text-dark btn btn-warning btn-block mb-1 mt-3" id="reloadBtn">`;
            document.getElementById('reloadBtn').addEventListener('click', () =>
            setTimeout(function(){
                window.location.reload();
              })
            )
        }

    }
      //show results
      document.getElementById('results').style.display='block';
  
      //hide loader
      // document.getElementById('loading').style.display='none';
  
    } 