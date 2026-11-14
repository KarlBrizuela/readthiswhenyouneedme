lucide.createIcons();

let  hugcount = document.getElementById('hug-count');
const emergencyhug = document.querySelector('.emergencyhug')
let count = 0;
emergencyhug.addEventListener('click', function(){
    count++;
    hugcount.textContent = count;
})