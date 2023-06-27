const buttonContainer = document.querySelector('.blog-button');
buttonContainer.addEventListener('click', event => {
    
    const blogId = event.target.dataset.blogid;
    let whichWork;
    if(event.target.id === 'delete') {
        whichWork = 'delete';
    } else if(event.target.id === 'edit') {
        whichWork = 'edit';
        location = `http://localhost:3000/blog/${blogId}/${whichWork}`;
    }

    if(whichWork === 'delete') {
        let url =  `http://localhost:3000/blog/${blogId}/${whichWork}`;
        fetch(url, {
            method: whichWork.toUpperCase()
        })
        .then(response =>  response.json())
        .then(data => {
            location = 'http://localhost:3000/user/profile';
        })
        .catch(error => {
            console.log(error);
        });
    }
});