document.getElementById("file").onchange = () => {
    console.log("submitted");
    console.log(document.querySelector('form input').value);
    document.querySelector("form").submit();
};