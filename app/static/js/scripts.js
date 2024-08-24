document.addEventListener('DOMContentLoaded', function () {
    // Funções de registro e login com fetch
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(registerForm);

            try {
                const response = await fetch(registerForm.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    errorMessage.textContent = result.error || 'An error occurred. Please try again.';
                }
            } catch (error) {
                errorMessage.textContent = 'An error occurred. Please try again.';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(loginForm);

            try {
                const response = await fetch(loginForm.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    window.location.href = '/feed';
                } else {
                    errorMessage.textContent = result.error || 'Invalid username or password.';
                }
            } catch (error) {
                errorMessage.textContent = 'An error occurred. Please try again.';
            }
        });
    }

    // like/dislike e follow/unfollow

    // Event listener for click events
    document.addEventListener('click', function (event) {
        const clickedElement = event.target;

        // Check if the clicked element is an open quote button
        if (clickedElement.classList.contains('button-interaction-open-quote')) {
            handleOpenQuoteClick(clickedElement);
        }
        // Check if the clicked element is a close quote button
        if (clickedElement.classList.contains('button-interaction-close-quote')) {
            handleCloseQuoteClick(clickedElement);
        }
        // Check if the clicked element is a follow button
        if (clickedElement.classList.contains('follow-button')) {
            toggleFollow(clickedElement);
        }
    });

    // Function to handle open quote button click
    function handleOpenQuoteClick(element) {
        const openInteraction = element;
        const closeInteraction = element.parentElement.querySelector('.button-interaction-close-quote');

        let isOpenSelected = openInteraction.classList.contains('quote-selected');
        let isCloseSelected = closeInteraction.classList.contains('quote-selected');
        // If the open quote button is not selected
        if (!isOpenSelected) {
            openInteraction.src = 'static/images/open-quote-filled.png';
            openInteraction.classList.add('quote-selected');
            console.log("open selected");
            // Deselect the close quote button if it is selected
            if (isCloseSelected) {
                closeInteraction.src = 'static/images/close-quote-empty.png';
                closeInteraction.classList.remove('quote-selected');
                isCloseSelected = false;
            }
            // Deselect the open quote button
        } else {
            openInteraction.src = 'static/images/open-quote-empty.png';
            openInteraction.classList.remove('quote-selected');
            console.log("open deselected");
        }
    }

    // Function to handle close quote button click
    function handleCloseQuoteClick(element) {
        const closeInteraction = element;
        const openInteraction = element.parentElement.querySelector('.button-interaction-open-quote');
        const postElement = element.closest('.block-text');

        let isOpenSelected = openInteraction.classList.contains('quote-selected');
        let isCloseSelected = closeInteraction.classList.contains('quote-selected');
        // If the close quote button is not selected
        if (!isCloseSelected) {
            closeInteraction.src = 'static/images/close-quote-filled.png';
            closeInteraction.classList.add('quote-selected');
            console.log("close selected");
            // Deselect the open quote button if it is selected
            if (isOpenSelected) {
                openInteraction.src = 'static/images/open-quote-empty.png';
                openInteraction.classList.remove('quote-selected');
                isOpenSelected = false;
            }

            // Fade out and remove the post after 2 seconds
            postElement.classList.add('fade-out');
            setTimeout(() => {
                postElement.remove();
            }, 200);

        } else {
            closeInteraction.src = 'static/images/close-quote-empty.png';
            closeInteraction.classList.remove('quote-selected');
            console.log("close deselected");
        }
    }

    // Function to handle follow button click
    function toggleFollow(button) {
        button.classList.toggle('following');
        if (button.classList.contains('following')) {
            button.textContent = 'Following';
        } else {
            button.textContent = 'Follow';
        }
    }

    // Função para renderizar o feed (assumindo que há um feed a ser renderizado)
    function renderFeed(posts) {
        const feedContainer = document.querySelector('.feed-others-posts');
        feedContainer.innerHTML = '';

        // Create and append post elements for each post in the posts array
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('block-text');

            postElement.innerHTML = `
             <div class="feed-others-posts">
                <div class="block-text">
                <div class="logo-header-holder">
                    <img src="static/images/logo_quote.png" alt="quote logo" class="quote_logo_feed">
                </div>
                <p class="post-para">${post.texto}</p>
                <div class="author-following">
                    <p>@${post.user}</p>
                <p class="follow-button" onclick="toggleFollow()">Follow</p>
                </div>
                <div class="buttons-interaction-quote">
                    <img src="static/images/open-quote-empty.png" alt="open quote" class="button-interaction-open-quote">
                    <img src="static/images/close-quote-empty.png" alt="close quote" class="button-interaction-close-quote">
                </div>
                   </div>
            </div>
                
            `;

            feedContainer.appendChild(postElement);
        });
    }

    // Exemplo de renderização do feed se houver posts
    let postsQuotes = JSON.parse(localStorage.getItem('postsQuotes')) || [];
    if (postsQuotes.length > 0) {
        renderFeed(postsQuotes);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('password');
        const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        const confirmPassword = document.getElementById('confirmPassword');

        const closeEyeIcon = "{{ url_for('static', filename='images/close-eye.png') }}";
        const openEyeIcon = "{{ url_for('static', filename='images/open-eye.png') }}";

        // Toggle Password Visibility for Password Field
        togglePassword.addEventListener('click', function () {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.src = type === 'password' ? closeEyeIcon : openEyeIcon;
        });

        // Toggle Password Visibility for Confirm Password Field
        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.src = type === 'password' ? closeEyeIcon : openEyeIcon;
        });
    });



});

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os elementos de senha e os ícones de olho
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    // Função para alternar a visibilidade das senhas
    function togglePasswordVisibility(targetPassword, targetIcon) {
        const type = targetPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        targetPassword.setAttribute('type', type);
        targetIcon.src = type === 'password' ? closeEyeIcon : openEyeIcon;
    }

    // Verifica se estamos na página de login ou registro e ajusta o comportamento
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function () {
            togglePasswordVisibility(password, togglePassword),
                togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
        });
    }

    if (toggleConfirmPassword && confirmPassword) {
        toggleConfirmPassword.addEventListener('click', function () {
            togglePasswordVisibility(confirmPassword, toggleConfirmPassword),
                togglePasswordVisibility(password, togglePassword);
        });
    }

    // Adicione aqui os outros manipuladores de eventos, se necessário...
});


