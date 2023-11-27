const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const quantidade = document.querySelector("#quantidade");
const type = document.querySelector("#type");
const btNew = document.querySelector("#btNew");

const Rendimentos = document.querySelector(".Rendimentos");
const Despesas = document.querySelector(".Despesas");
const total = document.querySelector(".total");

let items = [];

btNew.addEventListener('click', () => {
    if (descItem.value === "" || quantidade.value === "" || type.value === "") {
        return alert("Preencha todos os campos!");
    }

    items.push({
        desc: descItem.value,
        quantidade: Math.abs(Number(quantidade.value)).toFixed(2),
        type: type.value,
    });

    setItensBD();

    loadItens();

    descItem.value = "";
    quantidade.value = "";
});

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();

    
}

function insertItem(item, index) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>${item.quantidade}</td>
        <td>${item.type} ${
            item.type === "Entrada"
            ? '<i class="bx bxs-chevron-up-circle"></i>'
            : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td>
            <button onclick="deleteItem(${index})">
            <i class='bx bxs-trash' style = "font-size: 25px;
            color: #ff0000; padding"></i>
            </button>
        </td>`;
    tbody.appendChild(tr);
}



function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });

    getTotals();
}

function getTotals() {
    const quantidadeRendimentos = items
        .filter((item) => item.type === "Entrada")
        .map((transaction) => Number(transaction.quantidade));

    const quantidadeDespesas = items
        .filter((item) => item.type === "Saida")
        .map((transaction) => Number(transaction.quantidade));

    const totalRendimentos = quantidadeRendimentos.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const totalDespesas = Math.abs(
        quantidadeDespesas.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalRendimentos - totalDespesas).toFixed(2);

    Rendimentos.textContent = totalRendimentos;
    Despesas.textContent = totalDespesas;
    total.textContent = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbitems")) ?? [];
const setItensBD = () => localStorage.setItem("dbitems", JSON.stringify(items));

loadItens();
