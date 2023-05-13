// import { riddle, country } from "../server/server"

// fetch API from server
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

document.getElementById('bottomGuess').innerHTML = `${riddle}`
console.log(country)
let k = 3;
let c = 2;
document.querySelectorAll(".allPaths").forEach(e => {
    e.addEventListener("mouseover", async function () {
        // window.onmousemove=function (j) {
        //      let x = j.clientX
        //      let y = j.clientY
        //      document.getElementById('name').style.top = y -60 + 'px'
        //      document.getElementById('name').style.left = x + 'px'
        // }
         
             
             if (k !== 0) {
                e.style.cursor = 'pointer';
                e.style.fill = "#00ff95";
                document.getElementById('try').innerHTML = `Осталось попыток: ${k} <br>
                Выбрано: ${e.id}`
             }
             
             if (k === 0) {
                e.style.cursor = 'default';
             }
        //  document.getElementById("name").style.opacity = 1
        
        //  document.getElementById("namep").innerText = e.id
    })
    e.addEventListener("mouseleave", function () {
            if (k !== 0) {
                document.getElementById('try').innerHTML = `Осталось попыток: ${k} <br> *Выберите страну*`;
                e.style.fill = "white";
            }
            
            
        
        //  document.getElementById("name").style.opacity = 0
    })
    
    
    e.addEventListener('click', function (e) {
        e.preventDefault();
        c = c - 1;
        if (c === -2) {
            window.location.reload();
        }
        if (c <= 1 && c !== -2) {
            //Show loader
            // document.getElementById('loading').style.display='block';
            setTimeout(GuessCountry);
        }
    })

    function GuessCountry(){
        // UI Vars
        
        if (country === e.id) {
            document.getElementById('try').innerHTML = `Угадали. Страна - ${country} <br>`;
            document.getElementById('try').innerHTML += 'Нажмите сюда, чтобы попробовать ещё!'
            k = 0;
            document.getElementById('try').classList = 'tries-success input-group-addon card card-body text-center mt-1 mb-2';
            document.getElementById('try').classList.add('text-white');
            e.style.fill = 'green'
            document.getElementById('try').addEventListener('mouseover', async (e) => {
                e.preventDefault()
                document.getElementById('try').classList = 'bg-warning tries-warning input-group-addon card card-body text-dark text-center mt-1 mb-2';
            })
            document.getElementById('try').addEventListener('mouseleave', async (e) => {
                e.preventDefault()
                document.getElementById('try').classList = 'tries-failure input-group-addon card card-body text-center mt-1 mb-2';
                document.getElementById('try').classList.add('text-white');
            })
            document.getElementById('try').addEventListener('click', () => {
                setTimeout(function(){
                    //window.location.assign("text.html");
                    window.location.reload();
                 });
            })
        } else {
            e.style.fill = 'red'
            k = k - 1
            if (k !== 0) {
                document.getElementById('try').innerHTML = `Не угадали! <br> *Выберите страну*`;
                document.getElementById('try').classList.add('not-yet');
            }
            if (k === 0) {
                document.getElementById('try').innerHTML = `Слили. Страна - ${country} <br>`;
                document.getElementById('try').innerHTML += 'Нажмите сюда, чтобы попробовать ещё!'
                document.getElementById('try').classList = 'tries-failure input-group-addon card card-body text-center mt-1 mb-2';
                document.getElementById('try').classList.add('text-white');
                document.getElementById('try').addEventListener('mouseover', async (e) => {
                    e.preventDefault()
                    document.getElementById('try').classList = 'bg-warning tries-warning input-group-addon card card-body text-dark text-center mt-1 mb-2';
                })
                document.getElementById('try').addEventListener('mouseleave', async (e) => {
                    e.preventDefault()
                    document.getElementById('try').classList = 'tries-failure input-group-addon card card-body text-center mt-1 mb-2';
                    document.getElementById('try').classList.add('text-white');
                })
                e.style.fill = 'red'
                document.getElementById('try').addEventListener('click', () => {
                    setTimeout(function(){
                        //window.location.assign("text.html");
                        window.location.reload();
                     });
                })
                
            }
    
        }

      
        } 




})
        // if (k !== 0) {
        //     if (e.id === country) {
        //         e.style.fill = 'green'
        //         setTimeout(function(){
        //             window.location.assign("text.html");
        //          }, 4000);
        //     } else {
        //         e.style.fill = 'red'
        //     }
        // }
        // if (k === 0) {
        //     e.style.fill = 'red'
        //         setTimeout(function(){
        //             window.location.assign("text.html");
        //          }, 4000);
        // }

        // k -= 1;

