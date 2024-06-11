document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('background-music');
    audio.play();
});

let currentIndex = 0;
var audio = new Audio('music/mii-maker.mp3');
audio.loop = true;
var isPlaying = false;

document.querySelector('.mute-button').addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        this.querySelector('img').src = 'images/mute.png';
    } else {
        audio.play();
        isPlaying = true;
        this.querySelector('img').src = 'images/unmute.png';
    }
});

function openSnakeGameModal() {
    var snakeGameFrame = document.getElementById('snakeGameFrame');
    snakeGameFrame.src = 'https://funhtml5games.com?embed=mariofps'; // Set the iframe src back to game
    document.getElementById('snakeGameModal').style.display = 'block';
    if (isPlaying) {
        audio.pause(); // Pause the background music
    }
}

function closeSnakeGameModal() {
    var snakeGameFrame = document.getElementById('snakeGameFrame');
    snakeGameFrame.src = ''; // Stop the iframe content
    document.getElementById('snakeGameModal').style.display = 'none';
    if (isPlaying) {
        audio.play(); // Resume the background music if it was playing
    }
}

function openTheaterMode() {
    document.getElementById('theaterModeModal').style.display = 'block';
    populateCarousel();
    updateCarousel();
}

function closeTheaterMode() {
    document.getElementById('theaterModeModal').style.display = 'none';
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
}

function previousItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1; // Loop to the last item
    }
    updateCarousel();
}

function nextItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop to the first item
    }
    updateCarousel();
}

const games = [];

const consolesSelect = document.getElementById('consoles'); // Get reference to the select element

document.getElementById('add-item-button').addEventListener('click', openAddItemModal);

document.getElementById('add-item-modal-button').addEventListener('click', function() {
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const ownedOn = document.getElementById('consoles').value;

    if (title && description && file && ownedOn) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const game = {
                title: title,
                description: description,
                image: event.target.result,
                ownedOn: ownedOn
            };
            games.push(game);
            renderTable();
            closeAddItemModal();
        };
        reader.readAsDataURL(file);
    }
});

function openAddItemModal() {
    document.getElementById('addItemModal').style.display = 'block';
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

function renderTable() {
    const table = document.getElementById('item-table');
    table.innerHTML = '';
    games.forEach((game, index) => {
        const row = table.insertRow();
        const imageCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const detailsCell = row.insertCell(2); // New cell for details button

        const img = document.createElement('img');
        img.src = game.image;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.objectFit = 'cover';
        imageCell.appendChild(img);

        titleCell.textContent = game.title;

        // Create and append details button
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('details-button');
        detailsButton.textContent = '...';
        detailsButton.onclick = function() {
            openItemDetailsModal(game);
        };
        detailsCell.appendChild(detailsButton);
    });
}

function openItemDetailsModal(game) {
    const modal = document.getElementById('itemDetailsModal');
    modal.style.display = 'block';

    // Populate modal with item details
    document.getElementById('item-details-title').textContent = game.title;
    document.getElementById('item-details-image').src = game.image;
    document.getElementById('item-details-description').textContent = game.description;
    document.getElementById('item-details-owned-on').textContent = "Owned on: " + game.ownedOn;
}

function closeItemDetailsModal() {
    const modal = document.getElementById('itemDetailsModal');
    modal.style.display = 'none';
}

function populateCarousel() {
    const track = document.querySelector('.carousel-track');
    track.innerHTML = '';
    games.forEach(game => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        const title = document.createElement('h2');
        title.textContent = game.title;
        const img = document.createElement('img');
        img.src = game.image;
        img.style.width = '400px';
        img.style.height = '400px';
        img.style.objectFit = 'cover';
        const ownedOn = document.createElement('p');
        ownedOn.textContent = "Owned on: " + game.ownedOn;
        item.appendChild(title);
        item.appendChild(img);
        item.appendChild(ownedOn); // Append Owned On instead of description
        track.appendChild(item);
    });
}
