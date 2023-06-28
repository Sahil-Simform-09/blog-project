const buttonContainer = document.querySelector('.blog-button');
buttonContainer.addEventListener('click', event => {
    
    const blogId = event.target.dataset.blogid;
    const userId = event.target.dataset.userid;
    
    let whichWork;
    if(event.target.id === 'delete') {
        whichWork = 'delete';
    } else if(event.target.id === 'edit') {
        whichWork = 'edit';
        location = `http://localhost:3000/blog/${blogId}/${whichWork}/${userId}/`;
    }

    if(whichWork === 'delete') {
        let url =  `http://localhost:3000/blog/${blogId}/${whichWork}/${userId}/`;
        console.log(url);
        fetch(url, {
            method: whichWork.toUpperCase()
        })
        .then(response =>  response.json())
        .then(data => {
            location = 'http://localhost:3000' = data.redirectUrl;
        })
        .catch(error => {
            console.log(error);
        });
    }
});