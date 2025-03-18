'use strict'

async function pesquisarCard(city){
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=wCylfStKoX7qrU7gbP3iaXLsa0DMBM9p0p7rU13c&school.city=${city}&fields=school.name,school.state,school.city`

    const response = await fetch(url)
    const data = await response.json()
 
    return data.results
  
}

function criarCard(link){
    const galeria = document.getElementById('galeria')
    const novoCard = document.createElement('h1')
    novoCard.textContent = link

    galeria.appendChild(novoCard)
}

async function preencherPagina (){
    const escola = document.getElementById('escola').value
    const card = await pesquisarCard(escola)

    const galeria = document.getElementById('galeria')

    galeria.replaceChildren('')
    card.forEach(criarCard)
    console.log(card)
}

document.getElementById('pesquisar')
    .addEventListener('click', preencherPagina)