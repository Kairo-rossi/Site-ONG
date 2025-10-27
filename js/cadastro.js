// js/cadastro.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-voluntario');
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    if (!form) return;

    /**
     * Adiciona feedback visual de erro customizado (aviso de preenchimento incorreto).
     * @param {HTMLElement} input - O campo de input.
     * @param {string} mensagem - A mensagem de erro.
     */
    function exibirFeedback(input, mensagem) {
        // Remove feedback anterior
        let feedback = input.parentNode.querySelector('.feedback-erro');
        if (feedback) feedback.remove();

        // Cria o novo elemento de feedback
        feedback = document.createElement('p');
        feedback.className = 'feedback-erro';
        feedback.style.color = '#DC3545'; // Vermelho de erro
        feedback.style.fontSize = '0.875rem';
        feedback.style.marginTop = '4px';
        feedback.textContent = mensagem;

        // Insere o feedback após o input
        input.parentNode.appendChild(feedback);
        input.classList.add('is-invalid-js'); // Adiciona classe para destaque (opcional)
    }

    /**
     * Remove o feedback visual de erro.
     * @param {HTMLElement} input - O campo de input.
     */
    function removerFeedback(input) {
        const feedback = input.parentNode.querySelector('.feedback-erro');
        if (feedback) feedback.remove();
        input.classList.remove('is-invalid-js');
    }

    // ----------------------------------------------------
    // VALIDAÇÕES DE CONSISTÊNCIA EM TEMPO REAL (EVENTO 'input')
    // ----------------------------------------------------

    // Validação de Nome: Mínimo 5 caracteres
    nomeInput.addEventListener('input', function() {
        if (nomeInput.value.length < 5) {
            exibirFeedback(nomeInput, 'O nome deve ter pelo menos 5 caracteres.');
        } else {
            removerFeedback(nomeInput);
        }
    });

    // Validação de Telefone: (99) 99999-9999
    // Se o iMask não estiver ativo, garantimos o formato de preenchimento.
    telefoneInput.addEventListener('input', function() {
        // Regex mais flexível para validação de formato
        const pattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (telefoneInput.value.length < 14 || !pattern.test(telefoneInput.value)) {
            exibirFeedback(telefoneInput, 'Formato de telefone incorreto. Ex: (99) 99999-9999.');
        } else {
            removerFeedback(telefoneInput);
        }
    });
    
    // Validação de Mensagem: Mínimo 20 caracteres
    mensagemInput.addEventListener('input', function() {
        if (mensagemInput.value.length > 0 && mensagemInput.value.length < 20) {
            exibirFeedback(mensagemInput, `Diga um pouco mais! Mínimo 20 caracteres. (Atual: ${mensagemInput.value.length})`);
        } else {
            removerFeedback(mensagemInput);
        }
    });


    // ----------------------------------------------------
    // VALIDAÇÃO FINAL (EVENTO 'submit')
    // ----------------------------------------------------
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão

        // Dispara validação nativa para garantir que campos obrigatórios sejam verificados
        if (!form.checkValidity()) {
            form.reportValidity();
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validação de Consistência JS (após a validação nativa)
        let formValido = true;
        
        // Revalida nome
        if (nomeInput.value.length < 5) {
            exibirFeedback(nomeInput, 'O nome deve ter pelo menos 5 caracteres.');
            formValido = false;
        }

        // Revalida telefone
        const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!phonePattern.test(telefoneInput.value)) {
            exibirFeedback(telefoneInput, 'Formato de telefone incorreto. Ex: (99) 99999-9999.');
            formValido = false;
        }
        
        // Revalida mensagem
        if (mensagemInput.value.length > 0 && mensagemInput.value.length < 20) {
             exibirFeedback(mensagemInput, `Diga um pouco mais! Mínimo 20 caracteres. (Atual: ${mensagemInput.value.length})`);
             formValido = false;
        }


        if (formValido) {
            // Se tudo estiver OK, simula o envio e abre o modal.
            console.log('Formulário Enviado com Sucesso! Abrindo modal...');
            
            // Chama a função global definida em main.js
            window['openModal']?.(); 
            
            // Remove todos os feedbacks e limpa o formulário
            form.querySelectorAll('.feedback-erro').forEach(el => el.remove());
            form.querySelectorAll('.is-invalid-js').forEach(el => el.classList.remove('is-invalid-js'));
            form.reset(); 
        } else {
             // Rola a tela para o primeiro erro se houver
             const firstInvalid = form.querySelector(':invalid, .is-invalid-js');
             firstInvalid?.focus();
        }
    });
});