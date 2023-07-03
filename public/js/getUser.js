const user = JSON.parse(localStorage.getItem('user'));
const userImg = document.querySelector('.profile img');

userImg.setAttribute('src', `${user.imgUrl}`);

const form = document.querySelector('.profile form');
form.addEventListener('submit', async event => {
    event.preventDefault();
 
    const imageFile = document.querySelector('#file').files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`http://localhost:3000/user/profile/${user.userId}`, {
        method: 'PATCH',
        body: formData,
      });
  
    const responseObj = await response.json();
    const responseUrl = responseObj.redirectUrl;
    
    user.imgUrl = responseObj.imgUrl;
    localStorage.setItem('user', JSON.stringify(user));
    location = `http://localhost:3000${responseUrl}`;
});