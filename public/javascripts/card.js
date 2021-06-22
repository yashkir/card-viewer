var imageEl = document.getElementById('image');
var avatarEl = document.getElementById('avatar');
var contentEl = document.getElementById('content');
var setCardBtnEl = document.getElementById('set-card-btn');
var cardNumEl = document.getElementById('card-num');
var currentCardNumEl = document.getElementById('current-card-num');

function loadCard(cardNum) {
  fetch("http://localhost:3000/api/cards/" + cardNum)
    .then(card => card.json())
    .then(content => {
      imageEl.setAttribute("src", content.image.url); 
      avatarEl.setAttribute("src", content.avatar.url);
      contentEl.innerHTML = `<h4>${content.post.title}</h4><p>${content.post.body}</p>`;
      currentCardNumEl.innerHTML = `${cardNum}`;
    });

}

setCardBtnEl.addEventListener("click", e => {
  e.preventDefault();
  loadCard(cardNumEl.value);
});

loadCard(cardNumEl.value);
