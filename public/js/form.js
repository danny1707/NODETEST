window.onload = () => {
    if (sessionStorage.user) {
        user.JSON.parse(sessionStorage.user)
        if (user.email) {
            location.replace('/')
        }
    }
}

let formBTN = document.querySelector('.submit-btn')
let loader = document.querySelector('.loader')

formBTN.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null
    let email = document.querySelector('#email') || null
    let password = document.querySelector('#password') || null
    let number = document.querySelector('#number') || null
    let tac = document.querySelector('#tc') || null

    if (fullname !== null) {
        //pagina de registro
    } else {
        if (!email.ariaValueMax.length || !password.value.length) {
            showFormError('fill all inputs')
        } else {
            loader.style.display = 'block'
            sendDat('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})