'use strict'

async function pesquisarFotos (){
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=wCylfStKoX7qrU7gbP3iaXLsa0DMBM9p0p7rU13c&${school.city}fields=latest.school.faculty_salary,school.name,latest.student.size,school.state,school.city,latest.school.school_url,%20latest.school.faculty_salary,latest.school.price_calculator_url`

    const response = await fetch(url)
    const data = await response.json()
 
    return data.message
}

function criarImagem(link){
    const galeria = document.getElementById('galeria')
    const novaImg = document.createElement('img')
    novaImg.src   = link

    galeria.appendChild(novaImg)
}

async function preencherFotos (){
    const escola = document.getElementById('escola').value
    const fotos = await pesquisarFotos(escola)
    const galeria = document.getElementById('galeria')

    galeria.replaceChildren('')
    fotos.forEach(criarImagem)
    console.log(fotos)
}

document.getElementById('pesquisar').addEventListener('click', preencherFotos)