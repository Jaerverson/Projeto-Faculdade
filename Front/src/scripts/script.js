// Base de dados de livros
const books = [
    {
        id: 1,
        title: "O Hobbit",
        author: "J.R.R. Tolkien",
        category: "ficção",
        description: "Uma aventura épica de um hobbit chamado Bilbo Bolseiro que se vê envolvido em uma jornada inesperada com anões e um mago.",
        image: "./modules/img/O_hobbit.jpg",
        rating: "4.8/5"
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "técnico",
        description: "Um guia prático para escrever código limpo, legível e mantível. Essencial para desenvolvedores profissionais.",
        image: "./modules/img/Clean Code.jpg",
        rating: "4.7/5"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        category: "ficção",
        description: "Um romance distópico que retrata um futuro totalitário onde o governo controla todos os aspectos da vida.",
        image: "./modules/img/1984.jpg",
        rating: "4.6/5"
    },
    {
        id: 4,
        title: "A Revolução Francesa",
        author: "Simon Schama",
        category: "história",
        description: "Uma análise profunda e envolvente dos eventos que transformaram a França e o mundo no século XVIII.",
        image: "./modules/img/A revolução francesa.jpg",
        rating: "4.5/5"
    },
    {
        id: 5,
        title: "JavaScript: O Guia Definitivo",
        author: "David Flanagan",
        category: "técnico",
        description: "A referência mais completa sobre JavaScript, cobrindo desde o básico até conceitos avançados.",
        image: "./modules/img/JS o guia definitivo.jpg",
        rating: "4.7/5"
    },
    {
        id: 6,
        title: "Fundação",
        author: "Isaac Asimov",
        category: "ficção",
        description: "Uma épica de ficção científica que segue a queda e reconstrução de uma galáxia inteira.",
        image: "./modules/img/Fundação.jpg",
        rating: "4.8/5"
    },
    {
        id: 7,
        title: "A História da Humanidade",
        author: "Yuval Noah Harari",
        category: "história",
        description: "Uma perspectiva inovadora sobre como a humanidade evoluiu de primatas para criar civilizações complexas.",
        image: "./modules/img/A história da humanidade_.jpg",
        rating: "4.6/5"
    },
    {
        id: 8,
        title: "Python para Análise de Dados",
        author: "Wes McKinney",
        category: "técnico",
        description: "Aprenda a usar Python e suas bibliotecas para análise e manipulação de dados em larga escala.",
        image: "./modules/img/Python para analise.jpg",
        rating: "4.5/5"
    },
    {
        id: 9,
        title: "O Senhor dos Anéis",
        author: "J.R.R. Tolkien",
        category: "ficção",
        description: "A sequência épica de O Hobbit, seguindo a jornada de Frodo para destruir o Anel Único.",
        image: "./modules/img/O senhor dos aneus.jpg",
        rating: "4.9/5"
    },
    {
        id: 10,
        title: "Design Patterns",
        author: "Gang of Four",
        category: "técnico",
        description: "Os padrões de design fundamentais que todo desenvolvedor deve conhecer para escrever código melhor.",
        image: "./modules/img/Design Patterns.jpg",
        rating: "4.6/5"
    },
    {
        id: 11,
        title: "Duna",
        author: "Frank Herbert",
        category: "ficção",
        description: "Uma obra-prima de ficção científica que explora política, religião e ecologia em um universo distante.",
        image: "./modules/img/Duna.jpg",
        rating: "4.7/5"
    },
    {
        id: 12,
        title: "A Queda do Império Romano",
        author: "Edward Gibbon",
        category: "história",
        description: "Uma análise clássica sobre os fatores que levaram ao colapso do Império Romano Ocidental.",
        image: "./modules/img/a queda do imperio romano.jpg",
        rating: "4.4/5"
    }
];

let currentFilter = 'todos';
let filteredBooks = [...books];

// Elementos do DOM
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const navButtons = document.querySelectorAll('.nav-btn');
const modal = document.getElementById('bookModal');
const closeBtn = document.querySelector('.close');

// Renderizar livros
function renderBooks(booksToRender = filteredBooks) {
    booksGrid.innerHTML = '';
    
    booksToRender.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">por ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <p class="book-rating"> ${book.rating}</p>
            </div>
        `;
        
        bookCard.addEventListener('click', () => openModal(book));
        booksGrid.appendChild(bookCard);
    });
    
    // Se não houver livros, mostrar mensagem
    if (booksToRender.length === 0) {
        booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a0a0a0; padding: 40px;">Nenhum livro encontrado.</p>';
    }
}

// Filtrar livros por categoria
function filterByCategory(category) {
    currentFilter = category;
    if (category === 'todos') {
        filteredBooks = [...books];
    } else {
        filteredBooks = books.filter(book => book.category === category);
    }
    renderBooks(filteredBooks);
}

// Buscar livros
function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    let booksToSearch = currentFilter === 'todos' ? books : books.filter(book => book.category === currentFilter);
    
    filteredBooks = booksToSearch.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) || 
        book.author.toLowerCase().includes(lowerQuery)
    );
    
    renderBooks(filteredBooks);
}

// Abrir modal
function openModal(book) {
    document.getElementById('modalImage').src = book.image;
    document.getElementById('modalTitle').textContent = book.title;
    document.getElementById('modalAuthor').textContent = `Autor: ${book.author}`;
    document.getElementById('modalCategory').textContent = `Categoria: ${book.category}`;
    document.getElementById('modalDescription').textContent = book.description;
    document.getElementById('modalRating').textContent = ` ${book.rating}`;
    
    modal.classList.add('active');
}

// Fechar modal
function closeModal() {
    modal.classList.remove('active');
}

// Event Listeners
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterByCategory(btn.dataset.filter);
    });
});

searchInput.addEventListener('input', (e) => {
    searchBooks(e.target.value);
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Inicializar
renderBooks();
