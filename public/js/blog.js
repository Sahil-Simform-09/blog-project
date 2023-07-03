const buttonContainer = document.querySelector('.blog-button');
buttonContainer.addEventListener('click', async event => {
    
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
        try {
            const response = await fetch(`http://localhost:3000/blog/${blogId}/${whichWork}/${userId}/`, {
                method: whichWork
            })
            console.log(whichWork);
            const responseObj = await response.json();
    
            location = 'http://localhost:3000' + responseObj.redirectUrl;
        } catch (error) {
            console.log(error);
        }
    }
});