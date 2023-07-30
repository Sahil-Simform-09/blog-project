const form = document.querySelector('form');
            
const path = location.pathname;
form.removeAttribute('method');
                
const title = document.querySelector('#title'),
    content = document.querySelector('#content');

document.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
        title: title.value,
        content: content.value,
        id: Number(location.pathname.substring(6, location.pathname.length - 5))
    }
    
    try {
        const response = await fetch(location.pathname, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const responseObj = await response.json();
        location = 'http://localhost:3000' + responseObj.redirectUrl;
    } catch (error) {
        console.log(error);   
    }
}); 