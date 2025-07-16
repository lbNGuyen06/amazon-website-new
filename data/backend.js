// create new http messenge to send to the backend
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
  xhr.response;
});
//open have 2 parament :
// + type of http message: get post put delete
// + where to send http message
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
