'use strict';

async function pesquisarCard(city) {
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=wCylfStKoX7qrU7gbP3iaXLsa0DMBM9p0p7rU13c&school.city=${city}&fields=latest.school.faculty_salary,school.name,latest.student.size,school.state,school.city,latest.school.school_url,latest.school.faculty_salary,latest.school.price_calculator_url`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

function criarCard(link) {
    const galeria = document.getElementById('galeria');
    const novoCard = document.createElement('div');
    novoCard.classList.add('card');

    const nome = link['school.name'];
    const estado = link['school.state'];
    const cidade = link['school.city'];
    const estudantes = link['latest.student.size'];
    const site = link['latest.school.school_url'];
    const salario = link['latest.school.faculty_salary'];
    const calculadora = link['latest.school.price_calculator_url']

    novoCard.innerHTML = `
        <h1>${nome}</h1>
        <h2>Cidade: ${cidade}</h2>
        <h2>Estado: ${estado}</h2>
        <button class="saiba-mais" data-nome="${nome}" data-estado="${estado}" data-cidade="${cidade}">Saiba Mais</button>
    `;

    galeria.appendChild(novoCard);
    novoCard.querySelector('.saiba-mais').addEventListener('click', exibirDetalhes);

}

async function preencherPagina() {
    const escola = document.getElementById('escola').value;
    const card = await pesquisarCard(escola);

    const galeria = document.getElementById('galeria');

    galeria.replaceChildren('');
    card.forEach(criarCard);
    console.log(card);
}

document.getElementById('pesquisar')
    .addEventListener('click', preencherPagina);

function exibirDetalhes(novo) {

    const nome = novo.target.dataset.nome;
    const estado = novo.target.dataset.estado;
    const cidade = novo.target.dataset.cidade;
    const estudantes = novo.target.dataset.estudantes;
    const site = novo.target.dataset.site;
    const salario = novo.target.dataset.salario;
    const calculadora = novo.target.dataset.calculadora;
    
        
    const detalhesCard = document.createElement('div');
    detalhesCard.classList.add('detalhes-card');
        
    detalhesCard.innerHTML = `
        <h1>${nome}</h1>
        <h3>Cidade: ${cidade}</h3>
        <h3>Estado: ${estado}</h3>
        <h3>Estudantes recentes: ${estudantes}</h3>
        <h3>Página oficial: ${site}</h3>
        <h3>Salário da faculdade: ${salario}</h3>
        <h3>Calculadora financeira escolar: ${calculadora} </h3>
        <button class="voltar">Voltar</button>
    `;
    const galeria = document.getElementById('galeria');
    galeria.replaceChildren(detalhesCard);

    detalhesCard.querySelector('.voltar').addEventListener('click', preencherPagina);

}

async function deletar(){
    const logo      = document.getElementById('logo')
    const imagem    = document.getElementById('imagem')
    const insta     = document.getElementById('insta')
    const face      = document.getElementById('face')
    const twitter   = document.getElementById('twitter')
    const cadastrar = document.getElementById('cadastrar')

    logo.style.display = 'none';
    imagem.style.display = 'none';
    insta.style.display = 'none';
    face.style.display = 'none';
    twitter.style.display = 'none';
    cadastrar.style.display = 'none'

}

document.getElementById('pesquisar').addEventListener('click', deletar);





