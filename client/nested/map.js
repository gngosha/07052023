// import { riddle, country } from "../server/server"

// fetch API from server
// https://zero7052023.onrender.com
let count_guessed = document.getElementById('guessed');
let count_notguessed = document.getElementById('notguessed');
if (sessionStorage.getItem('+') != null) {
    count_guessed.innerHTML = sessionStorage.getItem('+');
}
if (sessionStorage.getItem('-') != null) {
  count_notguessed.innerHTML = sessionStorage.getItem('-');
}

async function test() {
    let riddle;
    let country;
    const response = await fetch('https://zero7052023.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        const data = await response.json();
        riddle = data.bot; // trims any trailing spaces/'\n' ;
        country = data.message;
        console.log(riddle);
        console.log(country);
    } else {
        const err = await response.text()
    
        console.log("Something went wrong")
        console.log(err)
    }


let trry = document.getElementById('try');

document.getElementById('bottomGuess').innerHTML = `${riddle}`
console.log(country)
let k = 3;
let c = 2;

document.querySelectorAll(".allPaths").forEach(e => {
    e.addEventListener("mouseover", async function () {
        if (k !== 0) {
            e.style.cursor = 'pointer';
            e.style.fill = "#00ff95";
            document.getElementById('try').innerHTML = `Осталось попыток: ${k} <br> 
                Выбрано: ${e.id} <br> <span> Отгадано: <span class="text-success">${count_guessed.innerHTML}</span>&nbsp;&nbsp;&nbsp; Слито: <span class="text-danger">${count_notguessed.innerHTML}</span></span>`;
        }
        if (k === 0) {
            e.style.cursor = 'default';
        }
    })

    e.addEventListener("mouseleave", function () {   
        if (k !== 0) {
            document.getElementById('try').innerHTML = `Осталось попыток: ${k} <br> *Выберите страну* <br> <span> Отгадано: <span class="text-success">${count_guessed.innerHTML}</span>&nbsp;&nbsp;&nbsp; Слито: <span class="text-danger">${count_notguessed.innerHTML}</span></span>`;
                e.style.fill = "white";   
        }   
    })

    
        e.addEventListener('click', function (e) {
            e.preventDefault();
            c = c - 1;
            if (c === -2) {
                window.location.reload();
            }
            if (c <= 1 && c !== 2 && c !== -2) {
                setTimeout(GuessCountry);
            }
            
        })
    

    function GuessCountry(){
        if (country === e.id) {
            sessionStorage.setItem('+', JSON.parse(count_guessed.textContent) + 1);
            count_guessed.innerHTML = sessionStorage.getItem('+');
            document.getElementById('try').innerHTML = `Угадали. Страна - ${country} <br> `;
            document.getElementById('try').innerHTML += `Нажмите сюда, чтобы попробовать ещё! <br> <span> Отгадано: <span class="text-light">${count_guessed.innerHTML}</span>&nbsp;&nbsp;&nbsp; Слито: <span class="text-light">${count_notguessed.innerHTML}</span></span>`
            k = 0;
            c = -1;
            document.getElementById('try').classList = 'tries-success input-group-addon card card-body text-center mt-1 mb-2';
            document.getElementById('try').classList.add('text-white');
            e.style.fill = 'green'
            document.getElementById('try').addEventListener('mouseover', async (e) => {
                e.preventDefault()
                document.getElementById('try').classList = 'bg-warning tries-warning input-group-addon card card-body text-dark text-center mt-1 mb-2';
            })
            document.getElementById('try').addEventListener('mouseleave', async (e) => {
                e.preventDefault()
                document.getElementById('try').classList = 'tries-success input-group-addon card card-body text-center mt-1 mb-2';
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
                document.getElementById('try').innerHTML = `Не угадали! <br> *Выберите страну* <br> <span> Отгадано: <span class="text-success">${count_guessed.innerHTML}</span>&nbsp;&nbsp;&nbsp; Слито: <span class="text-danger">${count_notguessed.innerHTML}</span></span>`;
                document.getElementById('try').classList.add('not-yet');
            }
            if (k === 0) {
                sessionStorage.setItem('-', JSON.parse(count_notguessed.textContent) + 1);
                count_notguessed.innerHTML = sessionStorage.getItem('-');
                document.getElementById('try').innerHTML = `Слили. Страна - ${country} <br>`;
                document.getElementById('try').innerHTML += `Нажмите сюда, чтобы попробовать ещё! <br> <span> Отгадано: <span class="text-light">${count_guessed.innerHTML}</span>&nbsp;&nbsp;&nbsp; Слито: <span class="text-light">${count_notguessed.innerHTML}</span></span>`
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

    // if (k !== 0 ) {
    //     document.getElementById('try').addEventListener('mouseover', () => { 
            
    //         document.getElementById('try').innerHTML = 'Карта по умолчанию';
    //         document.getElementById('try').classList = 'bg-warning tries-warning input-group-addon card card-body text-dark text-center mt-1 mb-2';
            
    //     })
    
    //     document.getElementById('try').addEventListener('mouseleave', () => {
            
    //             document.getElementById('try').classList = "tries input-group-addon card card-body text-center mt-1";
    //             document.getElementById('try').innerHTML = ` Осталось попыток: ${k} <br>
    //             *Выберите страну*`;
            
    //     })
    // }
})


let svg = document.querySelector("#svg");
let viewport = document.querySelector("#viewport");
let point = svg.createSVGPoint();
let viewBox = svg.viewBox.baseVal;



let zoom = {
  animation: new TimelineLite(),
  scaleFactor: 1.6,
  duration: 0.5,
  ease: Power2.easeOut,
};



window.addEventListener("wheel", onWheel);


//
// ON WHEEL
// =========================================================================== 
function onWheel(event) {
  event.preventDefault();
  

  
  let normalized;  
  let delta = event.wheelDelta;

  if (delta) {
    normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
  } else {
    delta = event.deltaY || event.detail || 0;
    normalized = -(delta % 3 ? delta * 10 : delta / 3);
  }
  
  let scaleDelta = normalized > 0 ? 1 / zoom.scaleFactor : zoom.scaleFactor;
  
  point.x = event.clientX;
  point.y = event.clientY;
  
  let startPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    
  let fromlets = {
    ease: zoom.ease,
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height,
  };
  
  viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
  viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
  viewBox.width *= scaleDelta;
  viewBox.height *= scaleDelta;
    
  zoom.animation = TweenLite.from(viewBox, zoom.duration, fromlets);  
}

trry.addEventListener("click", resetViewport);


    let cachedViewBox = {
        x: viewBox.x,
        y: viewBox.y,
        width: viewBox.width,
        height: viewBox.height
    };

    function resetViewport() {
        let resetAnimation = new TimelineLite();

        let duration = 0;
        let ease = Power3.easeOut;
        
        resetAnimation.clear()
        .to(viewBox, duration, {
            x: cachedViewBox.x,
            y: cachedViewBox.y,
            width: cachedViewBox.width,
            height: cachedViewBox.height,
            ease: ease
        }, 0)
        .to(viewport, duration, {
            attr: { transform: "matrix(1,0,0,1,0,0)" },
            // rotation: "0_short",
            smoothOrigin: false,
            svgOrigin: "0 0",
            ease: ease
        }, 0)
    }
}

test();