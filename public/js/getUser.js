const user = JSON.parse(localStorage.getItem('user'));
const userImg = document.querySelector('.profile img');

userImg.setAttribute('src', `${user.imgUrl}`);

const form = document.querySelector('.profile form');
form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);

    console.log(formData);
    const response = await fetch(`http://localhost:3000/user/profile/${user.userId}`, {
        method: 'patch',
        body: formData,   
    });
    const responseObj = await response.json();

    console.log(responseObj);
});