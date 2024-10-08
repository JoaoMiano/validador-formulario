let validatorLogin = {
    handleSubmit: (e)=>{
        e.preventDefault()
        let send = true

        let inputs = form.querySelectorAll('input')
        validatorLogin.clearError()

        for(let i = 0; i <inputs.length;i++){
            let input = inputs[i]

            let check = validatorLogin.checkInput(input);
            if(check !== true){
                send = false
                //mostra o erro
                
                validatorLogin.showError(input, check)
                
                
            }
        }
        if(send){
            form.submit()
        }

        
    },
    checkInput: (input)=>{
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|'); //separo as regras
            for(i in rules){
                let rulesDetails = rules[i].split('=') //separo o denominador da regra do seu valor 0 é o a regra 1 0 valor
                
                switch(rulesDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'O campo não pode estar vazio.'
                        }
                        break;

                    case 'min':
                        if(input.value.length < rulesDetails[1]){
                            return `Deve ter no mínimo ${rulesDetails[1]} caracteres`
                        }
                        break;

                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Este não é um e-mail valido!'
                            }
                        }
                        break;
                }
                
            }
        }
        return true
    },

    showError(input, error){
        input.style.borderColor = '#f00';

        let errorElemnt = document.createElement('div');
        errorElemnt.classList.add('error');
        errorElemnt.innerHTML = error;

        input.parentElement.insertBefore(errorElemnt, input.nextElementSibling)
    },

    clearError:()=>{
        let inputs = document.querySelectorAll('input')

        for(let i = 0;i < inputs.length; i++){
            inputs[i].style = ''
        }
        let errorsElement = document.querySelectorAll('.error')
        for(let i = 0; i< errorsElement.length; i++){
            errorsElement[i].remove()
        }
    }
}



const form = document.querySelector('.validator-login');
form.addEventListener('submit', validatorLogin.handleSubmit)

