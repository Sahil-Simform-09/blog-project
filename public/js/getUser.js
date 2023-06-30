const userProfile = JSON.parse(localStorage.getItem('user'));
const userImg = document.querySelector('.profile img');

userImg.setAttribute('src', `${userProfile.imgUrl}`);

const form = document.querySelector('.profile form');
form.addEventListener('submit', async event => {
    event.preventDefault();
    const inputFile = document.querySelector('.file');
    const image = inputFile.value;

    const formData = new FormData();
    const obj = {
        imgUrl : image
    }
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await fetch(`http://localhost:3000/user/profile/${userProfile.userId}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'multipart/form-data'
        },
        body: formData,   
    });
    const responseObj = await response.json();

    console.log(responseObj);
});