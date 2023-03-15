const form = document.getElementById("novoItem");   
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []
  
itens.forEach( (element) => {
    criaElemento(element);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"].value;
    const quantidade = evento.target.elements["quantidade"].value

    const existe = itens.find( element => element.nome === nome)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
       }
       if(existe){
       itemAtual.id = existe.id

       atualizaElemento(itemAtual);
       itens[itens.findIdex(element => element.id === existe.id)] = itemAtual
       }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual)
        itens.push(itemAtual)
       }
       

       localStorage.setItem("itens", JSON.stringify(itens))

       form.reset();
})
function criaElemento(item){
   const novoItem = document.createElement("li")
   novoItem.classList.add("item")

   const numeroItem = document.createElement("strong")
   numeroItem.innerHTML = item.quantidade
   numeroItem.dataset.id = item.id
   novoItem.appendChild(numeroItem)
   
   novoItem.innerHTML += item.nome

   novoItem.appendChild(createBotao(item.id))

   lista.appendChild(novoItem)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
function createBotao(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener("click", function() {
           deletaElemento(this.parentNode, id)
    })
    return elementoBotao;
}
function deletaElemento(tag, id){
     tag.remove();
     tag.splice(itens.findIdex(element => elemento.id === id), 1)
     localStorage.setItem("itens", JSON.stringify(itens))
}