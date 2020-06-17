//UF: https://servicodados.ibge.gov.br/api/v1/localidades/estados
//Cidades: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

//Quando o eventListener ver uma mudança no campo id=uf, ele roda a função populateCities
document
    .querySelector("div[class=btn]")
    .addEventListener("click", mostraModal);

function mostraModal() {
    const mudarModal = document.querySelector("div[id=modal]");
    mudarModal.classList.toggle("hide");
}

// Função pra colocar todos os estados na caixa de seleção com id=uf
function populateUFs () {
    const ufSelect = document.querySelector("select[id=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then( states => {
            for(const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        } );
}

//Roda a função escrita acima
populateUFs();

// Função pra colocar todos as cidades na caixa de seleção com id=city
function populateCities(event) {
    const citySelect = document.querySelector("select[id=city]");

    //Essa constante recebe o valor correspondente ao estado que foi selecionado
    const ufValue = event.target.value;

    //Coloca o nome do estado na url, quando o form é enviado
    const indexOfSelectedState = event.target.selectedIndex;
    const stateInput = document.querySelector("input[id=state]");
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    //Limpa o campo de cidade para colocar a nova lista de cidades
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
    //Bloqueia o campo de escolha de cidades
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then( cities => {
            citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
            for(const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            //Reabilita o campo cidade para ser clicado
            citySelect.disabled = false;
        });
}

//Coloca o nome da cidade na url, quando o form é enviado
function changeCityValue() {
    const cityInput = document.querySelector("input[id=cityHidden]");
    //Essa constante recebe o valor correspondente a cidade que foi selecionada
    const cityValue = event.target.value;

    cityInput.outerHTML = `<input type="hidden" name="city" id="cityHidden" value="${cityValue}" required>`;

    //Desbloqueia o botão de busca do modal no index.html
    const botaoBuscarNoIndex = document.querySelector("button[id=botaoBuscar]");
    //botaoBuscarNoIndex.disabled = false;
    botaoBuscarNoIndex.outerHTML = `<button type="submit" id="botaoBuscar" class="botaoBuscar">Buscar</button>`;
    console.log(botaoBuscarNoIndex.outerHTML);
}

//Quando o eventListener ver uma mudança no campo id=uf, ele roda a função populateCities
document
    .querySelector("select[id=uf]")
    .addEventListener("change", populateCities);

//Quando o eventListener ver uma mudança no campo id=city, ele roda a função changeCityValue
document
    .querySelector("select[id=city]")
    .addEventListener("change", changeCityValue);
