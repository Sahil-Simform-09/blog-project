const makeReuest = async (body, WhichRequest) => {
    const url = location.pathname;
    const blogId = url.substring(url.lastIndexOf('/') + 1);
    const response = await fetch(`http://localhost:3000/blog/${blogId}/${WhichRequest}`, {
        method: 'post', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    
    const responseObj = await response.json();
    const responseUrl = responseObj.redirectUrl;
    const redirectUrl = responseUrl.substring(0, responseUrl.lastIndexOf('/'));

    location = `http://localhost:3000${redirectUrl}`;
} 

// add comment
const commentBtn = document.querySelector('.comment-div form button');
commentBtn.addEventListener('click', async event => {
    event.preventDefault();
    const comment = document.querySelector('textarea').value;

    if(comment.length === 0) {
        alert("please write comment before post");
    }

    const user = JSON.parse(localStorage.getItem('user'));  
    const body = {
        userId: user.userId,
        comment: comment
    }
    makeReuest(body, 'comment');
});

// add like
const likeBtn = document.querySelector('.like');
likeBtn.addEventListener('click', async event => {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const body = {
        userId: user.userId
    }
    console.log(body); 
    makeReuest(body, 'like');
});