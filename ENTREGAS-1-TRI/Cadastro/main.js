const actionBar = document.querySelector("div.action-bar")
const btAdd = actionBar.querySelector(".bt-add")
const btProcurar = actionBar.querySelector(".bt-procurar")
const container = document.querySelector(".container-data")
const templateModalAluno = container.querySelector("template.aluno")
const dados = []

btProcurar.addEventListener("click",() => {
    const info = actionBar.querySelector(".info")
    if (info.value == "") {
        dados.forEach(el => {
            container.appendChild(el )
        }) 
        return   
    }
    container.innerHTML = ""
    dados.forEach(el => {
        console.log(info.value)
        if (el.querySelector("#matricula").value == info.value) {
            container.appendChild(el)
        }
        
    })    
})

btAdd.addEventListener("click",() => {
    const cloneModal = templateModalAluno.content.cloneNode(true)
    container.appendChild(cloneModal)

    const maskElements = document.querySelectorAll("[data-mascara]")

    const fnMasks = {
        matricula: maskMatricula
    }

    function maskMatricula(el) {
        el.addEventListener("keydown", ev => {
            const key = ev.key
            if (!/[0-9]/.test(key) && !/Backspace/.test(key)) {
                ev.preventDefault()
            }
        })
    }

    maskElements.forEach(el => {
        const maskName = el.dataset.mascara
        const fnMascara = fnMasks[maskName]
        fnMascara(el)
    })
})

container.addEventListener("click", ev => {
    const btClose = ev.target.closest(".bt-close")
    const modal = ev.target.closest(".modal")

    if (btClose) {
        modal.remove()
    }
    
    const btAction = ev.target.closest(".action")
    
    if (btAction) { 
        form = modal.querySelector("form")
        dadosFormulario = new FormData(form)
        dadosFormulario.forEach(value => console.log(value))
        dados.push(modal)
    }
})
