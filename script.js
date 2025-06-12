//menu de navegação
const btn = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

btn.addEventListener('click', () => {
  btn.classList.toggle('is-active');
  menu.classList.toggle('active');
});

const links = document.querySelectorAll('#menu a');

links.forEach(link => {
  link.addEventListener('click', () => {
    btn.classList.remove('is-active');
    menu.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');

            // Fecha todos os outros
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle o item clicado
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});


// Validando campos nome e email para tirar ou colocar asterisco e mensagem de erro.
// As constantes globais são definidas aqui para serem acessíveis por todas as funções.
const nameInput = document.getElementById('name');
const nameError = document.getElementById('nameError');
const nameAsterisk = document.getElementById('nameAsterisk');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const emailAsterisk = document.getElementById('emailAsterisk');

// Radio buttons
const projectTypeRadios = document.querySelectorAll('input[name="entry.1519873842"]');
const projectTypeError = document.getElementById('projectTypeError');
const projectTypeAsterisk = document.getElementById('projectTypeAsterisk');
const allDescriptions = document.querySelectorAll('.project-description');

// Orçamento e Prazo
const budgetSelect = document.getElementById('budget');
const budgetError = document.getElementById('budgetError');
const budgetAsterisk = document.getElementById('projectBudgetAsterisk');

const timelineSelect = document.getElementById('timeline');
const timelineError = document.getElementById('timelineError');
const timelineAsterisk = document.getElementById('projectTimeAsterisk');

// Descrição do Projeto
const descriptionTextarea = document.getElementById('description');
const descriptionError = document.getElementById('descriptionError');
const descriptionAsterisk = document.getElementById('descriptionAsterisk'); 
// Se você não adicionou ID ao asterisco da descrição, use:
// const descriptionAsterisk = document.querySelector('label[for="description"] span');

// Funções de validação genéricas
// Renomeada de validateField para validateTextField para consistência
function validateTextField(inputElement, errorElement, asteriskElement) {
    if (inputElement.value.trim() !== '') {
        errorElement.style.display = 'none';
        // Apenas esconde o asterisco se ele existe (pode ser null se não for obrigatório)
        if (asteriskElement) {
            asteriskElement.style.display = 'none';
        }
        return true; // Campo válido
    } else {
        errorElement.style.display = 'block';
        if (asteriskElement) {
            asteriskElement.style.display = 'inline';
        }
        return false; // Campo inválido
    }
}

function validateSelectField(selectElement, errorElement, asteriskElement) {
    if (selectElement.value === '') {
        errorElement.style.display = 'block';
        if (asteriskElement) {
            asteriskElement.style.display = 'inline';
        }
        return false; // Campo inválido
    } else {
        errorElement.style.display = 'none';
        if (asteriskElement) {
            asteriskElement.style.display = 'none';
        }
        return true; // Campo válido
    }
}

function validateProjectRadios() {
    let isChecked = false;
    let selectedValue = null; // Para guardar o valor do radio selecionado

    projectTypeRadios.forEach(radio => {
        if (radio.checked) {
            isChecked = true;
            selectedValue = radio.value; // Pega o valor real
        }
    });

    if (isChecked) {
        projectTypeError.style.display = 'none';
        projectTypeAsterisk.style.display = 'none';

        allDescriptions.forEach(desc => {
            desc.style.display = 'none';
        });

        // Mapeia o valor para o ID da descrição
        let descriptionToShowId = '';
        switch (selectedValue) {
            case 'Landing Page':
                descriptionToShowId = 'landingPageDescription';
                break;
            case 'Site Institucional':
                descriptionToShowId = 'webSiteDescription';
                break;
            case 'Aplicativo Web':
                descriptionToShowId = 'webAppDescription';
                break;
        }

        if (descriptionToShowId) {
            const currentDescription = document.getElementById(descriptionToShowId);
            if (currentDescription) {
                currentDescription.style.display = 'block';
            }
        }
        return true; // Rádio válido
    } else {
        projectTypeError.style.display = 'block';
        projectTypeAsterisk.style.display = 'inline';

        allDescriptions.forEach(desc => {
            desc.style.display = 'none';
        });
        return false; // Rádio inválido
    }
}


// Adiciona um listener para quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('budgetForm');

    // Inicialização do estado de erro/asterisco (para campos obrigatórios) ao carregar a página
    // Isso garante que os asteriscos e mensagens de erro apareçam inicialmente se o campo está vazio
    validateTextField(nameInput, nameError, nameAsterisk);
    validateTextField(emailInput, emailError, emailAsterisk); // O email exige regex, então ajuste manual abaixo
    validateProjectRadios();
    validateSelectField(budgetSelect, budgetError, budgetAsterisk);
    validateSelectField(timelineSelect, timelineError, timelineAsterisk);
    validateTextField(descriptionTextarea, descriptionError, descriptionAsterisk);


    // --- Event Listeners para feedback instantâneo (ao digitar/selecionar) ---
    nameInput.addEventListener('input', function() {
        validateTextField(nameInput, nameError, nameAsterisk);
    });

    // Email precisa de validação de regex mais complexa, então não pode usar validateTextField diretamente
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            emailAsterisk.style.display = 'inline';
        } else {
            emailError.style.display = 'none';
            emailAsterisk.style.display = 'none';
        }
    });

    projectTypeRadios.forEach(radio => {
        radio.addEventListener('change', validateProjectRadios);
    });

    budgetSelect.addEventListener('change', function() {
        validateSelectField(budgetSelect, budgetError, budgetAsterisk);
    });

    timelineSelect.addEventListener('change', function() {
        validateSelectField(timelineSelect, timelineError, timelineAsterisk);
    });

    descriptionTextarea.addEventListener('input', function() {
        validateTextField(descriptionTextarea, descriptionError, descriptionAsterisk);
    });


    // --- Lógica do Modal (move-a para dentro de DOMContentLoaded se estiver fora) ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const modalContent = document.querySelector('.modal-content');

    function showModal(title, message, type) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalContent.classList.remove('success', 'error');
        if (type) {
            modalContent.classList.add(type);
        }
        modalOverlay.classList.add('show');
    }

    function hideModal() {
        modalOverlay.classList.remove('show');
        modalContent.classList.remove('success', 'error');
    }

    modalCloseButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            hideModal();
        }
    });


    // --- Event Listener para o SUBMIT do formulário (validação final) ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true; // Flag para controlar se o formulário é válido

        // --- CHAMADAS DE VALIDAÇÃO FINAL ---
        // Chame todas as funções de validação aqui e use seus retornos
        // para determinar a validade geral do formulário.

        // Validação Nome Completo
        if (!validateTextField(nameInput, nameError, nameAsterisk)) {
            isValid = false;
        }

        // Validação Email (com regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            emailAsterisk.style.display = 'inline';
            isValid = false;
        } else {
            emailError.style.display = 'none';
            emailAsterisk.style.display = 'none';
        }

        // Validação Tipo de Projeto (radio buttons)
        if (!validateProjectRadios()) {
            isValid = false;
        }

        // Validação Orçamento Estimado
        if (!validateSelectField(budgetSelect, budgetError, budgetAsterisk)) {
            isValid = false;
        }

        // Validação Prazo Desejado
        if (!validateSelectField(timelineSelect, timelineError, timelineAsterisk)) {
            isValid = false;
        }

        // Validação Descrição do Projeto
        if (!validateTextField(descriptionTextarea, descriptionError, descriptionAsterisk)) {
            isValid = false;
        }


        // Se todos os campos forem válidos
        if (isValid) {
            console.log('Formulário validado e pronto para envio!');
            // Simulação de envio para um servidor
            setTimeout(() => {
                const success = true; // Simula um envio bem-sucedido.
                if (success) {
                    showModal('Sucesso!', 'Obrigado! Sua solicitação de orçamento foi enviada com sucesso. Entraremos em contato em breve.', 'success');
                    form.reset(); // Limpa o formulário após o sucesso

                    // IMPORTANTE: Resetar o estado visual de erros/asteriscos e descrições após o reset do form
                    // Chame as funções de validação novamente para que eles reapareçam se vazios
                    validateTextField(nameInput, nameError, nameAsterisk);
                    // Como o email é mais complexo, precisa de uma chamada separada ou refatorar
                    emailError.style.display = 'block'; // Mostra erro
                    emailAsterisk.style.display = 'inline'; // Mostra asterisco
                    validateProjectRadios(); // Para radios
                    validateSelectField(budgetSelect, budgetError, budgetAsterisk);
                    validateSelectField(timelineSelect, timelineError, timelineAsterisk);
                    validateTextField(descriptionTextarea, descriptionError, descriptionAsterisk);
                    allDescriptions.forEach(desc => { desc.style.display = 'none'; }); // Oculta todas as descrições do projeto
                } else {
                    showModal('Erro!', 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.', 'error');
                }
            }, 500);
        } else {
            // Se a validação falhar, o scroll para o primeiro erro pode ser útil
            // Find the first error message that is visible and scroll to it
            const firstError = document.querySelector('.error-message[style*="display: block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});



  document.querySelectorAll('.content').forEach(content => {
    content.innerHTML += content.innerHTML + content.innerHTML + content.innerHTML + content.innerHTML;
  });




ScrollReveal().reveal('.fade-down-hero', {
  distance: '50px',       // deslocamento da animação
  origin: 'bottom',       // direção de onde o elemento vem
  duration: 1000,         // duração da animação (ms)
  interval: 200,          // intervalo entre cada item (efeito em cascata)
  reset: false             // anima de novo se rolar de volta
});
ScrollReveal().reveal('.fade-down-h2', {
  distance: '50px',       
  origin: 'bottom',       
  duration: 800,        
  interval: 200,         
  reset: false            
});
  ScrollReveal().reveal('.fade-left', {
    distance: '50px',       
    origin: 'left',       
    duration: 800, 
    delay: 400,       
    interval: 200,          
    reset: false            
  });
ScrollReveal().reveal('.fade-adv', {
  duration: 800,
  opacity: 0, 
  delay: 400, 
  interval: 100,
  reset: false
});
ScrollReveal().reveal('.fade-logo', {
  duration: 800,
  opacity: 0, 
  delay: 400, 
  scale: 0.75,
  interval: 200,
  reset: false
});
ScrollReveal().reveal('.fade-down-services', {
  distance: '50px',       
  duration: 800,         
  interval: 200,          
  reset: false             
});
ScrollReveal().reveal('.fade-up', {
  distance: '50px',       
  origin: 'top',       
  duration: 800,        
  interval: 200,         
  reset: false            
});
 ScrollReveal().reveal('.fade-right', {
    distance: '50px',       
    origin: 'right',       
    duration: 800, 
    delay: 400,       
    interval: 200,          
    reset: false            
  });

