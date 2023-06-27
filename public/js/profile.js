const hiddenProfile = document.querySelector('#hidden-profile').dataset;
let imgUrl = '';

if(JSON.stringify(hiddenProfile) !== 'null') {
    imgUrl = hiddenProfile.img;
    localStorage.setItem('UserImg', imgUrl);
}
const img = document.querySelector('img');
console.log(imgUrl);
imgUrl = localStorage.getItem('UserImg');
img.src = imgUrl;