//UF: https://servicodados.ibge.gov.br/api/v1/localidades/estados
//Cidades: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

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
}

//Quando o eventListener ver uma mudança no campo id=uf, ele roda a função populateCities
document
    .querySelector("select[id=uf]")
    .addEventListener("change", populateCities);

//Quando o eventListener ver uma mudança no campo id=city, ele roda a função changeCityValue
document
    .querySelector("select[id=city]")
    .addEventListener("change", changeCityValue);

//-----=====-----

//Ítens de coleta

//Pega todas as li
const todosItensDeColeta = document.querySelectorAll(".itens-grid li");
//Verifica se houve algum clique nesses itens
for(const item of todosItensDeColeta) {
    item.addEventListener("click", deixaSelecionado)
}

//Array contendo todos os itens selecionados
let listaDeItensSelecionados = [];

//Array que deve ir pro input do html
const atualizaInput = document.querySelector("input[name=itensSelecionados]");

function deixaSelecionado(event) {
    //Pega a tag li inteira
    const itemLi = event.target;

    //Pega o id do ítem, setado no cadastro.html
    const dataIdDoItem = event.target.dataset.id;

    //Verifica se o item tem ou não a classe selected
    //Se tem a classe, ele remove
    //Se não tem a classe, ele adiciona
    itemLi.classList.toggle("selected");

    //Verifica se o ítem clicado está ou não dentro da lista de ítens clicados
    //A const estãoSelecionados, returna o número da posição do id dentro do Array
    const temItemSelecionado = listaDeItensSelecionados.findIndex(
        function (item) {
            //Verifica se o id do item selecionado é igual a algum id
            //que está dentro do Array.
            const itemEncontrado = item == dataIdDoItem
            //Retorna verdadeiro ou falso
            return itemEncontrado
        }
    );

    //Se o ítem for clicado e estiver na lista, remove-lo
    //A const estãoSelecionados, returna o número da posição do id dentro do Array
    if (temItemSelecionado >= 0) {
        const itensFiltrados = listaDeItensSelecionados.filter(
            function (item) {
                //item é o número que foi encontrado naquela posição do Array
                const removeOItem = item != dataIdDoItem //Essa função retorna verdadeiro ou falso
                //Se o número do item for igual ao dataIdDoItem, vai remover aquela posição do Array
                return removeOItem
            }
        );
        //A lista de ítens selecionados é atualizada com os ítens filtrados
        listaDeItensSelecionados = itensFiltrados;
    } else {
        //Se o ítem for clicado e não estiver na lista, adiciona-lo
        listaDeItensSelecionados.push(dataIdDoItem)
    }

    //Atualizar o input itensSelecionado com os ítens selecionados
    atualizaInput.value = listaDeItensSelecionados;
}