document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Валидация имени пользователя
    function validateUsername() {
        const username = usernameInput.value.trim();
        const errorElement = document.getElementById('username-error');
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        
        if (!username) {
            showError(usernameInput, errorElement, 'Имя пользователя обязательно');
            return false;
        }
        
        if (!usernameRegex.test(username)) {
            showError(usernameInput, errorElement, 'Имя должно содержать 3-20 символов (буквы и цифры)');
            return false;
        }
        
        showSuccess(usernameInput, errorElement);
        return true;
    }
    
    // Валидация email
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailInput, errorElement, 'Email обязателен');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Введите корректный email');
            return false;
        }
        
        showSuccess(emailInput, errorElement);
        return true;
    }
    
    // Валидация телефона
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const errorElement = document.getElementById('phone-error');
        
        if (!phone) {
            clearError(phoneInput, errorElement);
            return true;
        }
        
        // Простая валидация номера телефона
        const phoneRegex = /^[\d\s\-+()]{10,}$/;
        const digitsOnly = phone.replace(/\D/g, '');
        
        if (digitsOnly.length < 10) {
            showError(phoneInput, errorElement, 'Номер телефона должен содержать минимум 10 цифр');
            return false;
        }
        
        showSuccess(phoneInput, errorElement);
        return true;
    }
    
    // Автоформатирование телефона
    function formatPhone() {
        let value = phoneInput.value.replace(/\D/g, '');
        
        if (value.length === 0) return;
        
        let formatted = '+7 ';
        
        if (value.length > 1) {
            formatted += '(' + value.substring(1, 4);
        }
        if (value.length >= 4) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formatted += '-' + value.substring(9, 11);
        }
        
        phoneInput.value = formatted;
    }
    
    // Валидация пароля
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('password-error');
        
        if (!password) {
            showError(passwordInput, errorElement, 'Пароль обязателен');
            return false;
        }
        
        if (password.length < 6) {
            showError(passwordInput, errorElement, 'Пароль должен содержать минимум 6 символов');
            return false;
        }
        
        showSuccess(passwordInput, errorElement);
        return true;
    }
    
    // Валидация подтверждения пароля
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorElement = document.getElementById('confirmPassword-error');
        
        if (!confirmPassword) {
            showError(confirmPasswordInput, errorElement, 'Подтверждение пароля обязательно');
            return false;
        }
        
        if (password !== confirmPassword) {
            showError(confirmPasswordInput, errorElement, 'Пароли не совпадают');
            return false;
        }
        
        showSuccess(confirmPasswordInput, errorElement);
        return true;
    }
    
    // Вспомогательные функции
    function showError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error', 'success');
        errorElement.textContent = '';
    }
    
    // Переключение видимости пароля
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    toggleConfirmPasswordBtn.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Автоформатирование телефона
    phoneInput.addEventListener('input', formatPhone);
    
    // Валидация при вводе
    usernameInput.addEventListener('blur', validateUsername);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    
    // Валидация при изменении пароля (для подтверждения)
    passwordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (isUsernameValid && isEmailValid && isPhoneValid && 
            isPasswordValid && isConfirmPasswordValid) {
            
            // Собираем данные формы
            const formData = {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim() || 'Не указан',
                password: passwordInput.value
            };
            
            console.log('Данные для отправки:', formData);
            
            // Показываем модальное окно
            successModal.style.display = 'flex';
            
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('success', 'error');
                });
                togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
                toggleConfirmPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
            }, 2000);
        } else {
            console.log('Форма содержит ошибки. Исправьте их перед отправкой.');
        }
    });
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});