let form = document.querySelector('.form');
let search = document.querySelector('.icon_hidden');
let header_message = document.querySelector('.header_message');

search.addEventListener('click', ()=>{
    form.classList.toggle('reveal');
    if (form.classList.contains('reveal') == true){
        header_message.style.display = 'none'
    }
    else{
        header_message.style.display = 'block';
    }
})