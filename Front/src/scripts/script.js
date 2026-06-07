async function carregarLivros(categoria = null) {

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  let url = '/livros';

  if (categoria && categoria !== 'todos') {
    url += `?categoria=${encodeURIComponent(categoria)}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const livros = await response.json();

  const booksGrid = document.getElementById('booksGrid');

  booksGrid.innerHTML = '';

  livros.forEach(livro => {
    booksGrid.innerHTML += `
      <div class="book-card">
        <img
          src="${livro.capa}"
          alt="${livro.titulo}"
          class="book-image"
        >

        <h3>${livro.titulo}</h3>

        <p>Categoria: ${livro.categoria}</p>

        <p>Ano: ${livro.ano_publicacao}</p>

        <p>Quantidade: ${livro.quantidade}</p>
      </div>
    `;
  });
}

document.querySelectorAll('.nav-btn').forEach(botao => {

  botao.addEventListener('click', () => {

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    botao.classList.add('active');

    const categoria = botao.dataset.filter;

    carregarLivros(categoria);

  });

});

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {

  const termo = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll('.book-card');

  cards.forEach(card => {

    const titulo = card.querySelector('h3').textContent.toLowerCase();

    if (titulo.includes(termo)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }

  });

});

carregarLivros();