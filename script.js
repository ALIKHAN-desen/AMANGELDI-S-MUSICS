const songs = document.querySelectorAll('.song');
const player = document.getElementById('mainPlayer');
const nowPlaying = document.getElementById('nowPlaying');
const favoritesDiv = document.getElementById('favorites');

let tracks = [];
let current = 0;
let fav = JSON.parse(localStorage.getItem('fav')) || [];

// собрать треки
songs.forEach((song, i) => {
  let title = song.querySelector('h3').textContent;
  let src = song.querySelector('source').src;

  tracks.push({ title, src });

  song.onclick = () => {
    current = i;
    play();
  };
});

function play() {
  player.src = tracks[current].src;
  nowPlaying.textContent = tracks[current].title;
  player.play();
}

// next prev
document.getElementById('next').onclick = () => {
  current = (current + 1) % tracks.length;
  play();
};

document.getElementById('prev').onclick = () => {
  current = (current - 1 + tracks.length) % tracks.length;
  play();
};

// поиск
document.getElementById('search').addEventListener('input', (e) => {
  let val = e.target.value.toLowerCase();
  songs.forEach(song => {
    let title = song.querySelector('h3').textContent.toLowerCase();
    song.style.display = title.includes(val) ? 'inline-block' : 'none';
  });
});

// ❤️ избранное + анимация
function renderFav() {
  favoritesDiv.innerHTML = '';
  fav.forEach(f => {
    let div = document.createElement('div');
    div.textContent = f;
    favoritesDiv.appendChild(div);
  });
}

document.querySelectorAll('.like').forEach((btn, i) => {
  let title = tracks[i].title;

  if (fav.includes(title)) {
    btn.classList.add('active');
    btn.textContent = '❤️';
  }

  btn.onclick = (e) => {
    e.stopPropagation();

    if (fav.includes(title)) {
      fav = fav.filter(t => t !== title);
      btn.classList.remove('active');
      btn.textContent = '♡';
    } else {
      fav.push(title);
      btn.classList.add('active');
      btn.textContent = '❤️';
    }

    localStorage.setItem('fav', JSON.stringify(fav));
    renderFav();
  };
});

renderFav();

// фильтр
function filterArtist(name) {
  songs.forEach(song => {
    song.style.display = song.dataset.artist === name ? 'inline-block' : 'none';
  });
}

// вход
document.getElementById('loginBtn').onclick = () => {
  alert("Скоро будет вход через Google 😎");
};