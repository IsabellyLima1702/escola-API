'use strict';

async function pesquisarCard(city) {
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=wCylfStKoX7qrU7gbP3iaXLsa0DMBM9p0p7rU13c&school.city=${city}&fields=school.name,school.state,school.city`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

function criarCard(link) {
    const galeria = document.getElementById('galeria');
    const novoCard = document.createElement('div'); // Usando div para melhor organização
    novoCard.classList.add('card');

    const nome = link['school.name'];
    const estado = link['school.state'];
    const cidade = link['school.city'];

    novoCard.innerHTML = `
        <h1>${nome}</h1>
        <h2>Cidade: ${cidade}</h2>
        <h3>Estado: ${estado}</h3>
    `;

    galeria.appendChild(novoCard);
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