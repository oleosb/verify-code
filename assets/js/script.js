let submit = document.querySelector('.submit')
let code = document.querySelector('.code')
let warning = document.querySelector('.warning')
let inputs = document.querySelectorAll('.code input')
let time = document.querySelector('.time span')
let tries = 3
let valid = ''
let validCode = '2361'
let secs = 59
let mins = 4

inputs[0].focus()

inputs.forEach((input, idx) => {
        input.addEventListener('keydown', (e) => {
                if ((e.key >= 0 || e.key <= 9)) {
                        inputs[idx].value = ''
                        valid = ''
                        if (idx != 3) {
                                setTimeout(() => inputs[idx + 1].focus(), 1)
                        } else {
                                setTimeout(() => inputs[idx].blur(), 1)
                                submit.disabled = false
                        }
                } else if (e.key == 'Backspace') {
                        setTimeout(() => inputs[idx - 1].focus(), 1)
                }
        })

        input.addEventListener('click', () => submit.disabled = true)
})

submit.addEventListener('click', () => {
        inputs.forEach(input => {
                valid += input.value
        })

        
        if (valid != validCode) {
                tries--
                code.classList.add('invalid')
                warning.innerHTML = `Verification code invalid. You have ${tries} more tries.`
                warning.classList.add('show')
                
                if (tries == 0) {
                        setTimeout(() => location.reload(), 1000)
                }
        } else {
                code.classList.remove('invalid')
                code.classList.add('valid')
                warning.classList.remove('show')
                window.location.href = "https://www.uplabs.com/posts/verification-code-screens-app-ui-8b955130-6426-4b7f-87bb-863ba5db95e9"
        }
})


let interval = setInterval(timerInterval, 1000)

function timerInterval() {
        secs--

        if (secs < 0) {
                secs = 59
                mins--
        }

        if (mins == 0 && secs == 00) {
                location.reload()
        }

        time.innerHTML = `${twoDigits(mins)}:${twoDigits(secs)}`
}

function twoDigits(value) {
        return ('0' + value).slice(-2)
}
