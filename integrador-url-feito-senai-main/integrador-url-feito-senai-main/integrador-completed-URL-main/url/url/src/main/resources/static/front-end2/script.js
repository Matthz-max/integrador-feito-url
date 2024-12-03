const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sModelo = document.querySelector("#m-modelo");
const SImagem = document.querySelector("#m-imagem");
const sAno = document.querySelector("#m-ano");
const sPreco = document.querySelector("#m-preco");
const sCor = document.querySelector("#m-cor");
const sPlaca = document.querySelector("#m-placa");
const btnSalvar = document.querySelector("#btnSalvar");
const modalConfirm = document.querySelector("#modalConfirm");
const btnConfirmDelete = document.querySelector("#btnConfirmDelete");
const btnCancelDelete = document.querySelector("#btnCancelDelete");

let itens = [];
let modelo;
let id = null; 

//outra função para limitar o ano
function limitarAno(event) {
  const campo = event.target;
  let valor = campo.value.replace(/\D/g, '');  
   
  if (valor.length > 4) {
    valor = valor.slice(0, 4);
  }
 
  if (parseInt(valor) > 2024) {
    valor = '2024';
  }
  
  campo.value = valor;
}
 
// Função para deixar a placa igual na vida real
function formatarPlaca(event) {
  const campo = event.target;
  let valor = campo.value.toUpperCase();

  valor = valor.replace(/[^A-Za-z0-9]/g, '');

  let parte1 = valor.slice(0, 3);
  let parte2 = valor.slice(3, 7);

  parte1 = parte1.replace(/[^A-Za-z]/g, '');
  parte2 = parte2.replace(/[^0-9]/g, '');

  if (parte2.length > 4) {
    parte2 = parte2.slice(0, 4);
  }

  valor = parte1 + (parte2 ? '-' + parte2 : '');

  campo.value = valor;
}

// Função para colocar a vírgula no preço
function virgula(event) {
  const campo = event.target;
  let valor = campo.value.replace(/\D/g, '');   
 
  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }
 
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  campo.value = valor;
}
 
function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sModelo.value = itens[index].modelo;
    sAno.value = itens[index].ano;
    sPreco.value = itens[index].preco;
    sCor.value = itens[index].cor;
    sPlaca.value = itens[index].placa;
    id = itens[index].id; 
  } else {
    sModelo.value = "";
    sAno.value = "";
    sPreco.value = "";
    sCor.value = "";
    sPlaca.value = "";
    id = null;  
  }
}

function editItem(index) {
  openModal(true, index);
}

function showConfirmDeleteModal(index) {
  itemToDelete = index;
  modalConfirm.classList.add("active");
}

btnConfirmDelete.onclick = () => {
  if (itemToDelete !== null) {
    deleteItem(itemToDelete);
    itemToDelete = null;
  }
  modalConfirm.classList.remove("active");
};

btnCancelDelete.onclick = () => {
  itemToDelete = null;
  modalConfirm.classList.remove("active");
};

btnSalvar.onclick = (e) => {
  e.preventDefault();
  if (sModelo.value === "" || sAno.value === "" || sPreco.value === "" || sCor.value === "" || sPlaca.value === "") {
    return;
  }
  if (SImagem.value === '') {
    alert('Por favor, insira a URL da foto.');
    return;
}

  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td><img src="${item.imagem}" alt="Imagem do Carro" style="max-width: 100px; max-height: 100px;" /></td>
    <td>${item.modelo}</td>
    <td>${item.ano}</td>
    <td>${item.preco}</td>
    <td>${item.cor}</td>
    <td>${item.placa}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="showConfirmDeleteModal(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
  
}

//CONECTANDO O FRONT COM O BACK
fetch(`http://localhost:8080/carro2/listar`, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
      itens = data;   
      renderTable();   
  })
  .catch(error => {
      console.error('Erro ao carregar os dados:', error);
  });
 
// Função para renderizar a tabela
function renderTable() {
  tbody.innerHTML = '';   
  itens.forEach((item, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
          <img src="${item.imagem}" alt="Imagem do Carro" style="max-width: 90px; max-height: 90px;" />
          <td>${item.modelo}</td>
          <td>${item.ano}</td>
          <td>${item.preco}</td>
          <td>${item.cor}</td>
          <td>${item.placa}</td>
          <td class="acao">
              <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
          </td>
          <td class="acao">
              <button onclick="showConfirmDeleteModal(${index})"><i class='bx bx-trash'></i></button>
          </td>
      `;
      tbody.appendChild(tr);
  });
}
 
sPlaca.addEventListener('input', formatarPlaca);
sPreco.addEventListener('input', virgula);

btnSalvar.onclick = (e) => {
  e.preventDefault();

  // Verifica se todos os campos estão preenchidos
  if (sModelo.value === "" || sAno.value === "" || sPreco.value === "" || sCor.value === "" || sPlaca.value === "" || SImagem.value === "") {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  const carroData = {
      modelo: sModelo.value,
      ano: sAno.value,
      preco: sPreco.value,
      cor: sCor.value,
      placa: sPlaca.value,
      imagem: SImagem.value // Aqui você pega a URL da imagem
  };

  // Adicione um console.log para verificar o conteúdo de carroData
  console.log('Dados do carro:', carroData);

  if (id) {
      // PUT: Atualizar carro existente
      fetch(`http://localhost:8080/carro2/atualizar/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'  
          },
          body: JSON.stringify(carroData)  
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          itens = itens.map(item => item.id === id ? data : item);  
          renderTable();   
          modal.classList.remove("active");  
      })
      .catch(error => {
          console.error('Erro ao atualizar os dados:', error);
      });
  } else {
      // POST: Criar novo carro
      fetch('http://localhost:8080/carro2/criar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(carroData)  
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          itens.push(data);   
          renderTable();  
          modal.classList.remove("active");   
      })
      .catch(error => {
          console.error('Erro ao criar o carro:', error);
      });
  }
};

  function deleteItem(index) {
    const idToDelete = itens[index].id;
  
    fetch(`http://localhost:8080/carro2/deletar/${idToDelete}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                itens.splice(index, 1);   
                renderTable();   
            } else {
                console.error('Erro ao excluir o carro');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir os dados:', error);
        });
  }
 