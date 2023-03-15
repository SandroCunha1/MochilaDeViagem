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
       }else{
        itemAtual.id = itens.length
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

   lista.appendChild(novoItem)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}