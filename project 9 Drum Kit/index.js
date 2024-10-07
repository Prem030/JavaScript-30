
const html = document.querySelector('html');
const keys = ['a' , 's' , 'd' , 'f' , 'g' , 'h' , 'j' , 'k' , 'l']
let key
html.addEventListener('keydown' , (event) =>{
    
    keys.forEach( element =>{
        if(element === event.key){
            key = document.getElementById(`${event.keyCode}`)
            
            const audio = new Audio(`sounds/${event.keyCode}.wav`);
            audio.play();
            key.classList.add('play')
            console.log(key);
        }
            
    })
})

const allButton = document.querySelectorAll('.btn');
html.addEventListener('keyup' , () =>{
    
        allButton.forEach(element =>{
            element.classList.remove('play')
        
            
    })
    
})