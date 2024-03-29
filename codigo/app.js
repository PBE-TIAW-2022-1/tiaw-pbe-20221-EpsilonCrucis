fetch("./lugares.json")
  .then(response => {
    return response.json();
  })
  .then(function (jsondata) {
    atualizarHTML(jsondata.lugares)
  });

let lugaresAtuais = [];

const onSearch = (search) => {
  fetch("./lugares.json")
    .then(response => {
      return response.json();
    })
    .then(function (jsondata) {
      atualizarHTML(jsondata.lugares, search)
    });
}

const doFilter = (filtro, tipoDoFiltro) => {
  if (lugaresAtuais.length == 0) {
    fetch("./lugares.json")
      .then(response => {
        return response.json();
      })
      .then(function (jsondata) {
        lugaresAtuais = jsondata.lugares
        atualizarHTML(jsondata.lugares, filtro, tipoDoFiltro)
      });
  } else {
    atualizarHTML(lugaresAtuais, filtro, tipoDoFiltro)
  }
}

const LimparCampos = () => {
  const campos = document.querySelectorAll('.form-control')
  campos.forEach(campo => campo.value = "")
}

const atualizarHTML = (dbLugares, filterOrSearch, filterType) => {
  let conteudo = document.getElementById('conteudo')
  let strHtml = ''
  let tam = 0
  if (dbLugares) {
    tam = Object.keys(dbLugares).length;
  } else {
    console.log('⛔️ Object is falsy');
  }
  // se esse argumento for passado, queremos filtrar ou pesquisar
  if (filterOrSearch !== undefined) {
    // se for passado o argumento filterType, se trata de um filtro
    if (filterType !== undefined) {
      removerFiltros.style.display = "block";
      switch (filterType) {
        case 'tipo':
          lugaresAtuais = lugaresAtuais.filter((item) => item.tipo == filterOrSearch);
          for (let i = 0; i < tam; i++) {
            if (filterOrSearch == dbLugares[i].tipo) { // se filtro é encontrado dentro de da string dbLugares[i].tipo
              strHtml +=
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="card" id="${dbLugares[i].tipo}" style="max-width: 100%; max-height: 100%;">
                    <img src="${dbLugares[i].linkImage1}" class="card-img-top">
                    <div class="card-body">
                        <h4 class="card-title">${dbLugares[i].nome}</h4>
                        <p><b>Tipo: </b>${dbLugares[i].tipo}</p>
                        <p style="color: #16a34a"><strong>${dbLugares[i].custo}</strong></p>
                        <p><b>Região: </b>${dbLugares[i].regiao}</p>
                        <button class="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#modal-lugar" id="${dbLugares[i].nome}">Saiba Mais</button>
                    </div>
                </div>
                </div>
              `
            }
          }
          DropdownTipo.innerHTML = filterOrSearch;
          DropdownTipo.classList.add("text-success");
          break;

        case 'custo':
          lugaresAtuais = lugaresAtuais.filter((item) => item.custo == filterOrSearch);
          for (let i = 0; i < tam; i++) {
            if (filterOrSearch == dbLugares[i].custo) {
              //lugaresAtuais.push(dbLugares[i])
              strHtml +=
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="card" id="${dbLugares[i].tipo}" style="max-width: 100%; max-height: 100%;">
                    <img src="${dbLugares[i].linkImage1}" class="card-img-top">
                    <div class="card-body">
                        <h4 class="card-title">${dbLugares[i].nome}</h4>
                        <p><b>Tipo: </b>${dbLugares[i].tipo}</p>
                        <p style="color: #16a34a"><strong>${dbLugares[i].custo}</strong></p>
                        <p><b>Região: </b>${dbLugares[i].regiao}</p>
                        <button class="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#modal-lugar" id="${dbLugares[i].nome}">Saiba Mais</button>
                    </div>
                </div>
                </div>
              `
            }
          }
          DropdownCusto.innerHTML = filterOrSearch;
          DropdownCusto.classList.add("text-success");
          break;

        case 'regiao':
          lugaresAtuais = lugaresAtuais.filter((item) => item.regiao == filterOrSearch);
          for (let i = 0; i < tam; i++) {
            if (filterOrSearch == dbLugares[i].regiao) {
              //lugaresAtuais.push(dbLugares[i])
              strHtml +=
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <div class="card" id="${dbLugares[i].tipo}" style="max-width: 100%; max-height: 100%;">
                    <img src="${dbLugares[i].linkImage1}" class="card-img-top">
                    <div class="card-body">
                        <h4 class="card-title">${dbLugares[i].nome}</h4>
                        <p><b>Tipo: </b>${dbLugares[i].tipo}</p>
                        <p style="color: #16a34a"><strong>${dbLugares[i].custo}</strong></p>
                        <p><b>Região: </b>${dbLugares[i].regiao}</p>
                        <button class="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#modal-lugar" id="${dbLugares[i].nome}">Saiba Mais</button>
                    </div>
                </div>
                </div>
              `
            }
          }
          DropdownRegiao.innerHTML = filterOrSearch;
          DropdownRegiao.classList.add("text-success");
          break;
      }

    }

    for (let i = 0; i < tam; i++) {

      if (dbLugares[i].nome.toLowerCase().includes(filterOrSearch.toLowerCase())) {
        strHtml +=
          `
              <div class="col-12 col-sm-12 col-md-6 col-lg-4">
              <div class="card" id="${dbLugares[i].tipo}" style="max-width: 100%; max-height: 100%;">
                  <img src="${dbLugares[i].linkImage1}" class="card-img-top">
                  <div class="card-body">
                      <h4 class="card-title">${dbLugares[i].nome}</h4>
                      <p><b>Tipo: </b>${dbLugares[i].tipo}</p>
                      <p style="color: #16a34a"><strong>${dbLugares[i].custo}</strong></p>
                      <p><b>Região: </b>${dbLugares[i].regiao}</p>
                      <button class="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#modal-lugar" id="${dbLugares[i].nome}">Saiba Mais</button>
                  </div>
              </div>
              </div>
            `
      }
    }

  } else {
    for (let i = 0; i < tam; i++) {
      strHtml +=
        `
          <div class="col-12 col-sm-12 col-md-6 col-lg-4">
          <div class="card" id="${dbLugares[i].tipo}" style="max-width: 100%; max-height: 100%;">
              <img src="${dbLugares[i].linkImage1}" class="card-img-top">
              <div class="card-body">
                  <h4 class="card-title">${dbLugares[i].nome}</h4>
                  <p><b>Tipo: </b>${dbLugares[i].tipo}</p>
                  <p style="color: #16a34a"><strong>${dbLugares[i].custo}</strong></p>
                  <p><b>Região: </b>${dbLugares[i].regiao}</p>
                  <button class="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#modal-lugar" id="${dbLugares[i].nome}">Saiba Mais</button>
              </div>
          </div>
          </div>
        `
    }
  }
  conteudo.innerHTML = strHtml;
}

function preencherPaginaHTML(lugar) {
  let conteudoLugar = document.getElementById('conteudo-lugar');
  let strHtml =
    `
  <div class="row justify-content-center" style="margin: 2%;">
    <div class="col-8">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${lugar.linkImage1}" class="w-100" style=" max-height: 75%;">
          </div>
          <div class="carousel-item">
            <img src="${lugar.linkImage2}" class="w-100" style=" max-height: 75%;">
          </div>
          <div class="carousel-item">
            <img src="${lugar.linkImage3}" class="w-100" style=" max-height: 75%;">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col">
      <h1 style="color: #1e293b">${lugar.nome}</h1>
      <h6 style="color: #2563eb">${lugar.endereco}</h6>
      <p style="color: #1e293b">${lugar.descricao}</p>
      <p style="color: #1e293b">${lugar.tipo}</p>
      <p style="color: #16a34a"><strong>Custo: </strong>${lugar.custo}</p>
    </div>
  </div>
    `
  conteudoLugar.innerHTML = strHtml;
}

const saibaMais = (event) => {
  if (event.target.type == 'button') {
    const nome = event.target.id
    fetch("./lugares.json")
      .then(response => {
        return response.json();
      })
      .then(function (jsondata) {
        for (let i = 0; i < (jsondata.lugares).length; i++) {
          if (jsondata.lugares[i].nome == nome) {
            preencherPaginaHTML(jsondata.lugares[i])
          }
        }
      });
  }
}

document.querySelector('#lugares>#conteudo').addEventListener('click', saibaMais)

//Itens do Menu Dropdown
document.querySelector('#dropdown-item-casal').addEventListener('click', () => { doFilter('Casal', 'tipo') })
document.querySelector('#dropdown-item-solteiro').addEventListener('click', () => { doFilter('Solteiro', 'tipo') })
document.querySelector('#dropdown-item-familia').addEventListener('click', () => { doFilter('Família', 'tipo') })
document.querySelector('#dropdown-item-amigos').addEventListener('click', () => { doFilter('Amigos', 'tipo') })

document.querySelector('#dropdown-item-custo1').addEventListener('click', () => { doFilter('$', 'custo') })
document.querySelector('#dropdown-item-custo2').addEventListener('click', () => { doFilter('$$', 'custo') })
document.querySelector('#dropdown-item-custo3').addEventListener('click', () => { doFilter('$$$', 'custo') })

document.querySelector('#dropdown-item-centro').addEventListener('click', () => { doFilter('Centro', 'regiao') })
document.querySelector('#dropdown-item-ptb').addEventListener('click', () => { doFilter('PTB', 'regiao') })
document.querySelector('#dropdown-item-norte').addEventListener('click', () => { doFilter('Norte', 'regiao') })
document.querySelector('#dropdown-item-citrolandia').addEventListener('click', () => { doFilter('Citrolândia', 'regiao') })

//Pesquisa
let search = document.querySelector('#search-input')

search.addEventListener("keypress", function (e) {
  if (e.key === 'Enter') {
    onSearch(search.value)
  }
});

document.querySelector('#btn-search').addEventListener('click', () => {
  onSearch(search.value)
})

//Menus Dropdown
let DropdownTipo = document.querySelector('#navbarDropdownTipo')
let DropdownCusto = document.querySelector('#navbarDropdownCusto')
let DropdownRegiao = document.querySelector('#navbarDropdownRegiao')

//Botão de remover filtros
let removerFiltros = document.querySelector('#btn-remover-filtros')


