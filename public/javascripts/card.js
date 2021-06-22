var imageEl = document.getElementById('image');
var cardEl = document.getElementById('card');
var avatarEl = document.getElementById('avatar');
var contentEl = document.getElementById('content');
var followBtnEl = document.getElementById('follow-btn');

var cardNum = 1;

fetch("http://localhost:3000/api/cards/" + cardNum)
  .then(card => card.json())
  .then(content => {
    imageEl.setAttribute("src", content.image.url); 
    avatarEl.setAttribute("src", content.avatar.url);
    contentEl.innerHTML = `<h4>${content.post.title}</h4><p>${content.post.body}</p>`;
  });
