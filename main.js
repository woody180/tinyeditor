const buttons = document.querySelectorAll('a');


// Loop through buttons
buttons.forEach(button => {
    button.onclick = e => {
        e.preventDefault();
        
        const el = e.target.closest('a');
        const icon = el.querySelector('i');
        
        
        // If check is not active
        if (!el.className.includes('active')) {
            
            buttons.forEach(item => {
                item.classList.remove('active');
                item.querySelector('i').setAttribute('uk-icon', 'icon: pencil; ratio: 2;');
            })
            
            el.classList.add('active');
            icon.setAttribute('uk-icon', 'icon: check; ratio: 2;');
        } else {
            el.classList.remove('active');
            icon.setAttribute('uk-icon', 'icon: pencil; ratio: 2;');
        }
    }
})

