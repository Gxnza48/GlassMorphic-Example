document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Animación de entrada para el encabezado
    gsap.from("header", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out"
    });

    // Animación para las tarjetas de características e información
    gsap.from(".card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#features",
            start: "top 80%"
        }
    });

    // Animación para los iconos
    gsap.from(".card i", {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
            trigger: "#features",
            start: "top 80%"
        }
    });

    // Animación suave para el desplazamiento de los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {duration: 1, scrollTo: target, ease: "power2.inOut"});
            }
        });
    });

    // Manejo del menú hamburguesa
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links li").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    }

    // Botón de scroll hacia arriba con animación suave
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        // Función para mostrar u ocultar el botón de scroll
        function toggleScrollToTopButton() {
            if (window.pageYOffset > 300) {
                if (!scrollToTopButton.classList.contains('show')) {
                    scrollToTopButton.classList.add('show');
                    gsap.to(scrollToTopButton, {duration: 0.5, opacity: 1, scale: 1});
                }
            } else {
                if (scrollToTopButton.classList.contains('show')) {
                    scrollToTopButton.classList.remove('show');
                    gsap.to(scrollToTopButton, {duration: 0.5, opacity: 0, scale: 0.5});
                }
            }
        }

        // Añadir el evento scroll al window
        window.addEventListener('scroll', toggleScrollToTopButton);

        // Asegurarse de que el botón esté oculto al cargar la página
        toggleScrollToTopButton();

        scrollToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {duration: 1.5, scrollTo: 0, ease: "power4.inOut"});
        });
    }

    // Toast Notification Function
    function showToast(message, isSuccess = true) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: isSuccess ? "toastify-success" : "toastify-error",
            style: {
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
            },
        }).showToast();
    }

    // Authentication System
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const closeBtn = document.querySelector('.close');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const usernameSpan = document.getElementById('username');

    if (loginBtn && signupBtn && modal && loginForm && signupForm && closeBtn) {
        loginBtn.addEventListener('click', () => {
            modal.classList.add('show');
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        });

        signupBtn.addEventListener('click', () => {
            modal.classList.add('show');
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        if (showSignupLink) {
            showSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            });
        }

        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.classList.remove('show');
            }
        });

        // Simple client-side authentication (for demonstration purposes only)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    updateAuthUI(true);
                    modal.classList.remove('show');
                    showToast('Login successful!', true);
                } else {
                    showToast('Invalid email or password', false);
                }
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                if (users.some(u => u.email === email)) {
                    showToast('Email already exists', false);
                } else {
                    const newUser = { name, email, password };
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    updateAuthUI(true);
                    modal.classList.remove('show');
                    showToast('Sign up successful!', true);
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                updateAuthUI(false);
                showToast('Logged out successfully', true);
            });
        }

        function updateAuthUI(isLoggedIn) {
            if (isLoggedIn) {
                loginBtn.style.display = 'none';
                signupBtn.style.display = 'none';
                if (profileBtn) {
                    profileBtn.style.display = 'flex';
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (usernameSpan) {
                        usernameSpan.textContent = currentUser.name;
                    }
                }
            } else {
                loginBtn.style.display = 'flex';
                signupBtn.style.display = 'flex';
                if (profileBtn) {
                    profileBtn.style.display = 'none';
                }
            }
        }

        // Profile dropdown animation
        if (profileBtn) {
            profileBtn.addEventListener('mouseenter', () => {
                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'block';
                    setTimeout(() => {
                        dropdownContent.style.opacity = '1';
                        dropdownContent.style.transform = 'translateY(0)';
                    }, 50);
                }
            });

            const profileDropdown = document.querySelector('.profile-dropdown');
            if (profileDropdown) {
                profileDropdown.addEventListener('mouseleave', () => {
                    const dropdownContent = document.querySelector('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            dropdownContent.style.display = 'none';
                        }, 300);
                    }
                });
            }
        }

        // Check if user is logged in on page load
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateAuthUI(!!currentUser);
    }
});