// ---------------------- MENU MOBILE ----------------------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// ---------------------- LISTA DE PRODUTOS ----------------------
const produtos = [
    {id:1, categoria:"maquinas", nome:"Trator John Deere", preco:45000, img:"https://images.unsplash.com/photo-1592982537447-6f2a6a0f8c67"},
    {id:2, categoria:"maquinas", nome:"Colheitadeira", preco:120000, img:"https://images.unsplash.com/photo-1523741543316-beb7fc7023d8"},
    {id:3, categoria:"maquinas", nome:"Pulverizador", preco:25000, img:"https://images.unsplash.com/photo-1523741543316-beb7fc7023d8"},
    {id:4, categoria:"sementes", nome:"Semente de Soja", preco:120, img:"https://images.unsplash.com/photo-1625246333195-78d9c38ad449"},
    {id:5, categoria:"sementes", nome:"Semente de Milho", preco:140, img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6"},
    {id:6, categoria:"sementes", nome:"Semente de Trigo", preco:100, img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6"},
    {id:7, categoria:"insumos", nome:"Fertilizante NPK", preco:300, img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6"},
    {id:8, categoria:"insumos", nome:"Corretivo de Solo", preco:250, img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6"},
    {id:9, categoria:"insumos", nome:"Defensivo Agrícola", preco:420, img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6"},
    {id:10, categoria:"sistemas", nome:"Irrigação por Gotejamento", preco:8000, img:"https://images.unsplash.com/photo-1464226184884-fa280b87c399"},
    {id:11, categoria:"sistemas", nome:"Pivô Central", preco:65000, img:"https://images.unsplash.com/photo-1464226184884-fa280b87c399"},
    {id:12, categoria:"sistemas", nome:"Automação Agrícola", preco:15000, img:"https://images.unsplash.com/photo-1464226184884-fa280b87c399"},
    {id:13, categoria:"drones", nome:"Drone Pulverizador", preco:18000, img:"https://images.unsplash.com/photo-1560493676-04071c5f467b"},
    {id:14, categoria:"drones", nome:"Drone de Monitoramento", preco:14000, img:"https://images.unsplash.com/photo-1560493676-04071c5f467b"},
    {id:15, categoria:"drones", nome:"Drone Multiespectral", preco:22000, img:"https://images.unsplash.com/photo-1560493676-04071c5f467b"}
];

// ---------------------- CARRINHO ----------------------
let carrinho = [];
const carrinhoItens = document.getElementById("carrinho-itens");
const totalEl = document.getElementById("total");
const produtosGrid = document.getElementById("produtos-grid");

// ---------------------- FUNÇÕES CARRINHO ----------------------
function adicionarCarrinho(id){
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);

    if(item){
        item.qtd++;
    } else {
        carrinho.push({...produto, qtd:1});
    }
    renderizarCarrinho();
}

function removerItem(id){
    carrinho = carrinho.filter(i => i.id !== id);
    renderizarCarrinho();
}

function atualizarQtd(id, qtd){
    const item = carrinho.find(i => i.id === id);
    item.qtd = Number(qtd);
    renderizarCarrinho();
}

function renderizarCarrinho(){
    carrinhoItens.innerHTML = "";
    let total = 0;

    carrinho.forEach(i => {
        total += i.preco * i.qtd;
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded flex justify-between items-center shadow";
        div.innerHTML = `
            <div>
                <strong>${i.nome}</strong> - R$ ${i.preco.toLocaleString('pt-BR')}
            </div>
            <div class="flex items-center gap-2">
                <input type="number" value="${i.qtd}" min="1" class="w-16 p-1 border rounded" onchange="atualizarQtd(${i.id}, this.value)">
                <button class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded" onclick="removerItem(${i.id})">X</button>
            </div>
        `;
        carrinhoItens.appendChild(div);
    });

    totalEl.innerText = total.toFixed(2);
}

// ---------------------- FINALIZAR PEDIDO ----------------------
document.getElementById("finalizar").addEventListener("click", () => {
    if(carrinho.length === 0){
        alert("O carrinho está vazio!");
        return;
    }

    let mensagem = "Olá, gostaria de comprar:%0A";
    carrinho.forEach(item => {
        mensagem += `${item.nome} - Qtd: ${item.qtd} - R$ ${item.preco.toLocaleString('pt-BR')}%0A`;
    });
    mensagem += `Total: R$ ${totalEl.innerText}`;

    window.open(`https://wa.me/5541999999999?text=${mensagem}`, "_blank");
});

// ---------------------- CATEGORIAS ----------------------
function renderizarProdutos(categoria){
    produtosGrid.innerHTML = "";

    const filtrados = produtos.filter(p => p.categoria === categoria);

    filtrados.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${p.img}" class="w-full h-56 object-cover">
            <div class="p-6">
                <h3 class="text-2xl font-bold text-green-800 mb-2">${p.nome}</h3>
                <p class="mb-3 font-bold text-xl">R$ ${p.preco.toLocaleString('pt-BR')}</p>
                <button onclick="adicionarCarrinho(${p.id})" class="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        produtosGrid.appendChild(card);
    });
}

// ---------------------- EVENTOS CATEGORIAS ----------------------
const botoesCategoria = document.querySelectorAll(".categoria-btn");

botoesCategoria.forEach(btn => {
    btn.addEventListener("click", () => {
        botoesCategoria.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderizarProdutos(btn.dataset.categoria);
    });
});

// ---------------------- RENDERIZAÇÃO INICIAL ----------------------
renderizarProdutos("maquinas");