const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll(".cor"))
const botao = divMain.querySelector("button")

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

function start() {
    inicio()
}

divMain.addEventListener("click", ev => {

    if (divs.indexOf(ev.target) == -1 || animatingColors) {
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        const tempo = divMain.querySelector(".pontuacao")
        tempo.innerHTML = 3
        divMain.querySelector(".timer").innerHTML = "TIMER"
        divs.forEach(div =>{
            div.classList.add("animate")
        })
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        divPontuacao.innerHTML = currentColorPosition
        currentColorPosition = 0
        setTimeout(() => turno(), 3000)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    const tempo = divMain.querySelector(".pontuacao")
    divMain.querySelector(".timer").innerHTML = "TIMER"
    let cnt = 3
    tempo.innerHTML = cnt
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        tempo.innerHTML = --cnt
        if(cnt <= 0) {
            divMain.querySelector(".timer").innerHTML = "PONTUAÇÃO"
            turno()
            clearInterval(idx)
        }
    }, 1000)
}

function turno() {
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}