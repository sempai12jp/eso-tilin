const form = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('.icon');
        if (newTheme === 'dark') {
            icon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            icon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    console.log('Tema cargado:', savedTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('.icon');
        if (savedTheme === 'dark') {
            icon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            icon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Botón de tema encontrado y configurado');
} else {
    console.log('Botón de tema no encontrado');
}

function scrollToForm() {
    const formSection = document.getElementById('contacto');
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    if (!phone) return true;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

function setupRealTimeValidation() {
    const fields = ['nombre', 'email', 'telefono'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldId));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(fieldId);
                }
            });
        }
    });
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return true;
    
    const value = field.value.trim();
    
    switch (fieldId) {
        case 'nombre':
            if (!value) {
                showError(fieldId, 'El nombre es requerido');
                return false;
            } else if (value.length < 2) {
                showError(fieldId, 'El nombre debe tener al menos 2 caracteres');
                return false;
            } else {
                clearError(fieldId);
                return true;
            }
            
        case 'email':
            if (!value) {
                showError(fieldId, 'El email es requerido');
                return false;
            } else if (!isValidEmail(value)) {
                showError(fieldId, 'Ingresa un email válido');
                return false;
            } else {
                clearError(fieldId);
                return true;
            }
            
        case 'telefono':
            if (value && !isValidPhone(value)) {
                showError(fieldId, 'Ingresa un teléfono válido');
                return false;
            } else {
                clearError(fieldId);
                return true;
            }
            
        default:
            return true;
    }
}

function validateTerms() {
    const termsCheckbox = document.getElementById('terminos');
    const termsError = document.getElementById('terminos-error');
    
    if (!termsCheckbox) return true;
    
    if (!termsCheckbox.checked) {
        if (termsError) {
            termsError.textContent = 'Debes aceptar los términos y condiciones';
        }
        return false;
    } else {
        if (termsError) {
            termsError.textContent = '';
        }
        return true;
    }
}

function validateForm() {
    let isValid = true;
    
    if (!form) return true;
    
    const requiredFields = ['nombre', 'email'];
    requiredFields.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });
    
    if (!validateTerms()) {
        isValid = false;
    }
    
    return isValid;
}

function showSuccessModal() {
    if (successModal) {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    }
}

// Función para cerrar el modal
function closeModal() {
    if (successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
        // Redirigir al index después de cerrar el modal
        window.location.href = 'index.html';
    }
}

async function submitForm(formData) {
    if (!form) return;
    
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Datos del formulario:', Object.fromEntries(formData));
        
        showSuccessModal();

        form.reset();
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
            return;
        }
        
        const formData = new FormData(form);
        
        await submitForm(formData);
    });
}

if (successModal) {
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successModal && successModal.style.display === 'block') {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
 
    loadTheme();
    
    if (form) {
        setupRealTimeValidation();
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

function showCustomSuccess(message) {
    if (successModal) {
        const modalBody = successModal.querySelector('.modal-body p');
        if (modalBody) {
            modalBody.textContent = message;
        }
        showSuccessModal();
    }
}

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `+${value}`;
        } else if (value.length <= 6) {
            value = `+${value.slice(0, 3)} ${value.slice(3)}`;
        } else if (value.length <= 9) {
            value = `+${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
        } else {
            value = `+${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)} ${value.slice(9, 12)}`;
        }
    }
    
    input.value = value;
}

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefono');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}); 