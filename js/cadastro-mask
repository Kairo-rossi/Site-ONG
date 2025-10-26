// Aguarda o DOM estar completamente carregado antes de manipular os elementos
document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------
    // 1. Máscara de CPF
    // ------------------------------------
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        IMask(cpfInput, {
            // Define o padrão do formato
            mask: '000.000.000-00',
            lazy: false // Garante que a máscara seja visível mesmo vazia
        });
    }

    // ------------------------------------
    // 2. Máscara de Telefone (Fixo e Celular - Dinâmica)
    // ------------------------------------
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        // Define as opções de máscara para telefones
        const phoneMask = {
            mask: [
                {
                    mask: '(00) 0000-0000' // Fixo (10 dígitos com DDD)
                },
                {
                    mask: '(00) 90000-0000' // Celular (11 dígitos com DDD)
                }
            ]
        };
        IMask(telefoneInput, phoneMask);
    }

    // ------------------------------------
    // 3. Máscara de CEP
    // ------------------------------------
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        IMask(cepInput, {
            mask: '00000-000' // Define o padrão do formato
        });
    }
    
    // Ponto de Melhoria: Adicionar lógica para limpar a máscara antes do submit
    // Isso garante que o back-end receba apenas números puros (apenas se for exigido)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function() {
            // Exemplo de como obter o valor sem a máscara
            const cpfValorPuro = IMask.get.instances(cpfInput)[0].unmaskedValue;
            console.log('Valor puro do CPF:', cpfValorPuro);
            
            // Se necessário, você pode criar campos hidden com os valores puros
            // ou atualizar o valor do input antes do submit
        });
    }
});

