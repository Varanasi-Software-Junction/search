let items = []; // Declare 'items' globally

window.onload = function () {
    loadItemsFromJSON();
};

function loadItemsFromJSON() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data; // Assign loaded data to the global 'items' variable
            displayItems(items);
        })
        .catch(error => console.error('Error loading items:', error));
}

function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        card.onclick = () => saveItem(item.name);
        container.appendChild(card);
    });
}

function filterItems() {
    const query = document.getElementById('searchField').value.toLowerCase();
    const cards = document.querySelectorAll('.item-card');
    // alert(cards.length);

    cards.forEach((card, index) => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        // alert(`${name}==${query}`);
        const description = card.querySelector('p').innerText.toLowerCase();
        const tags = items[index].tags.join(" ").toLowerCase(); // Join tags into a single string

        // Check if the query matches any part of the name, description, or tags
        if (name.includes(query) || description.includes(query) || tags.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


function saveItem(name) {
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    if (!savedItems.includes(name)) {
        savedItems.push(name);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }
}
