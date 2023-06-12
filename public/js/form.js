const form = document.querySelector('form');
            
const path = location.pathname;
form.removeAttribute('method');
                
const title = document.querySelector('#title'),
    content = document.querySelector('#content');

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const formData = {
        title: title.value,
        content: content.value,
        id: Number(location.pathname.substring(6, location.pathname.length - 5))
    }
                        
    console.log(location.pathname);
    fetch(location.pathname, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then(response =>  response.json())
    .then(data => {
        console.log(data);
        location = '/blog';
    })
    .catch(error => {
        console.log(error);
    });
});