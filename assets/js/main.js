const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const listaTarefas = document.querySelector('.lista-tarefas')

const criaLi = () => {
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        if(inputTarefa.value == '') return 
        criaTarefa(inputTarefa.value)
    }
})

const limpaInput = () => {
    inputTarefa.value = ''
    inputTarefa.focus()
}

const criaBotaoApagar = (li) => {
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

const criaTarefa = (textoInput) => {
    const li = criaLi()    
    li.innerHTML = textoInput
    listaTarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)   
    salvarTarefa()
}

btnTarefa.addEventListener('click', function(event){
    if(inputTarefa.value == '') return //nao permite que envie tarefa estando vazio 
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(event){
    const elemento = event.target;
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove()
        salvarTarefa()
    }
})

const salvarTarefa = () => {
    const liTarefas = listaTarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefas of liTarefas){
        let tarefaTexto = tarefas.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

const adicionaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    
    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas()