

// Games Available
const menu = document.querySelector('#Games-menu');
const menuLinks = document.querySelector('.navbar_menu');

//Display Game Menu
const gameMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', gameMenu);

// Games Available
const API_URL = 'https://www.cheapshark.com/api/1.0/games?ids=128%2C129%2C130';
const gamesWrapper = document.querySelector('.games_wrapper');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const searchResult = document.querySelector('#search-result');

let gamesArray = [];

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    gamesWrapper.innerHTML = ''; // clear existing games
    gamesArray = Object.values(data);
    displayGames(gamesArray);
  })
  .catch(error => console.error(error));

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredGames = gamesArray.filter(game => {
    return game.info.title.toLowerCase().includes(searchTerm);
  });
  

  //display search result
  if(filteredGames.length > 0) {
    const searchGame = filteredGames[0];
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game_container');

    const gameIcon = document.createElement('img');
    gameIcon.src = searchGame.info.thumb;
    gameIcon.alt = searchGame.info.title;

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = searchGame.info.title;

    gameContainer.appendChild(gameIcon);
    gameContainer.appendChild(gameTitle);

    searchResult.innerHTML = '';
    searchResult.appendChild(gameContainer);
    searchResult.style.display = 'none';
  }

  displayGames(filteredGames);

  if(searchTerm) {
    searchIcon.classList.add('show');
  } else {
    searchIcon.classList.remove('show');
  }
  });


function displayGames(games) {
  gamesWrapper.innerHTML = '';
  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('games_card');

    const gameImage = document.createElement('img');
    gameImage.src = game.info.thumb;
    gameImage.alt = game.info.title;

    const gameTitle = document.createElement('h2');
    gameTitle.textContent = game.info.title;

    const gamePrice = document.createElement('p');
    gamePrice.textContent = `Price: USD ${game.cheapestPriceEver.price}`;

    const likeButton = document.createElement('button');
    likeButton.classList.add('like_button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', () => {
      alert(`You liked ${game.info.title}!👍`);
    });

    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('dislike_button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.addEventListener('click', () => {
      alert(`You disliked ${game.info.title}👎!`);
    });

    gameCard.appendChild(gameImage);
    gameCard.appendChild(gameTitle);
    gameCard.appendChild(gamePrice);
    gameCard.appendChild(likeButton);
    gameCard.appendChild(dislikeButton);

    gamesWrapper.appendChild(gameCard);
  });
}
