document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 1. VIDEO DE FONDO (OPTIMIZADO) ====================
    const videos = [
        { id: 'video1', file: 'logo_haute.mp4' }
    ];
    
    videos.forEach((video, index) => {
        const videoEl = document.createElement('video');
        videoEl.id = video.id;
        videoEl.className = 'video-bg';
        videoEl.src = `/videos/${video.file}`;
        videoEl.muted = true;
        videoEl.loop = true;
        videoEl.autoplay = true;
        videoEl.playsInline = true;
        videoEl.setAttribute('playsinline', ''); // Para iOS
        document.body.prepend(videoEl);

        if(index === 0) {
            videoEl.classList.add('active');
            // Opacidad muy baja para que sea solo un efecto sutil
            videoEl.style.opacity = '0.12';
        }
    });

    // Rotación de videos (si tienes más de uno)
    let currentVideo = 0;
    setInterval(() => {
        const allVideos = document.querySelectorAll('.video-bg');
        if(allVideos.length > 1) {
            allVideos[currentVideo].classList.remove('active');
            allVideos[currentVideo].style.opacity = '0';
            currentVideo = (currentVideo + 1) % allVideos.length;
            allVideos[currentVideo].classList.add('active');
            allVideos[currentVideo].style.opacity = '0.12';
        }
    }, 8000);

    // Pausa el video cuando no está visible (ahorro de recursos)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (!entry.isIntersecting) {
                video.pause();
            } else {
                video.play();
            }
        });
    });
    
    document.querySelectorAll('.video-bg').forEach(video => {
        videoObserver.observe(video);
    });

    // ==================== 2. LAZY LOADING DE IMÁGENES ====================
    const lazyImages = document.querySelectorAll('img.lazy, img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Si tiene data-src, úsalo
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Añade clase cuando carga
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Carga 50px antes de que sea visible
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ==================== 3. SISTEMA DE PESTAÑAS (INDUMENTARIA) ====================
    function setupMainTabs() {
        const tabButtons = document.querySelectorAll('.attire-tab');
        const tabContents = document.querySelectorAll('.attire-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                
                const tabId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(`${tabId}-tab`);
                if(targetContent) {
                    targetContent.classList.add('active');
                }
                
                applyGenderFilter();
            });
        });
    }

    // ==================== 4. FILTRO POR GÉNERO ====================
    let currentGender = 'male';

    function setupGenderFilter() {
        const genderButtons = document.querySelectorAll('.gender-btn');
        
        genderButtons.forEach(button => {
            button.addEventListener('click', function() {
                genderButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                currentGender = this.getAttribute('data-gender');
                applyGenderFilter();
            });
        });
    }

    function applyGenderFilter() {
        const activeTab = document.querySelector('.attire-content.active');
        if (!activeTab) return;
        
        // Ocultar todos
        activeTab.querySelectorAll('.uniform-pair').forEach(pair => {
            pair.style.display = 'none';
            pair.classList.remove('visible');
        });
        
        // Mostrar solo el género seleccionado
        activeTab.querySelectorAll(`.uniform-pair[data-gender="${currentGender}"]`).forEach(pair => {
            pair.style.display = 'grid';
            pair.classList.add('visible');
        });
    }

    // ==================== 5. SMOOTH SCROLL ====================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if(href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ==================== 6. ANIMACIONES DE HISTORIA ====================
    function setupHistoryAnimations() {
        const historyChapters = document.querySelectorAll('.history-chapter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        historyChapters.forEach(chapter => {
            chapter.style.opacity = '0';
            chapter.style.transform = 'translateY(30px)';
            chapter.style.transition = 'all 0.6s ease-out';
            observer.observe(chapter);
        }); 
    }

    // ==================== 7. LIGHTBOX PARA GALERÍA ====================
    function setupLightbox() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const h3 = this.querySelector('h3');
                const p = this.querySelector('p');
                
                if(!img) return;
                
                const imgSrc = img.src;
                const title = h3 ? h3.textContent : '';
                const desc = p ? p.textContent : '';
                
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                lightbox.innerHTML = `
                    <div class="lightbox-content" style="max-width: 90%; max-height: 90%; position: relative;">
                        <span class="close-lightbox" style="
                            position: absolute;
                            top: -40px;
                            right: 0;
                            color: white;
                            font-size: 40px;
                            cursor: pointer;
                            z-index: 10001;
                        ">&times;</span>
                        <img src="${imgSrc}" alt="${title}" style="
                            max-width: 100%;
                            max-height: 80vh;
                            border-radius: 10px;
                            box-shadow: 0 0 30px rgba(255, 0, 54, 0.5);
                        ">
                        <div class="lightbox-info" style="
                            color: white;
                            text-align: center;
                            margin-top: 20px;
                        ">
                            <h3 style="color: #ff0036; margin-bottom: 10px;">${title}</h3>
                            <p>${desc}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Fade in
                setTimeout(() => lightbox.style.opacity = '1', 10);
                lightbox.style.opacity = '0';
                lightbox.style.transition = 'opacity 0.3s';
                
                const closeLightbox = () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                };
                
                lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => {
                    if(e.target === lightbox) closeLightbox();
                });
            });
        });
    }

    // ==================== 8. EFECTOS DEL MAPA ====================
    function setupMapEffects() {
        const mapMarker = document.querySelector('.map-marker');
        const mapImage = document.querySelector('.location-gallery img');
        
        if(mapMarker && mapImage) {
            mapMarker.addEventListener('mouseenter', function() {
                this.style.transform = 'translate(-50%, -50%) scale(1.3)';
                this.style.textShadow = '0 0 30px rgba(255, 0, 54, 1)';
            });
            
            mapMarker.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
                this.style.textShadow = '0 0 20px rgba(255, 0, 54, 0.8)';
            });
        }
    }

    // ==================== 9. MENÚ RESPONSIVE ====================
    function setupResponsiveMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('open');
                
                // Cambia el icono
                this.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            // Cierra el menú al hacer click en un link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }

    // ==================== 10. HEADER AL HACER SCROLL ====================
    function setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        if(!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if(currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==================== 11. NAVEGACIÓN ACTIVA ====================
    function setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==================== 12. OPTIMIZACIÓN DE RENDIMIENTO ====================
    // Reduce animaciones cuando el usuario prefiere menos movimiento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // Deshabilita hover effects en touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // ==================== INICIALIZACIÓN ====================
    // Ejecuta todas las funciones en orden
    setupMainTabs();
    setupGenderFilter();
    setupSmoothScroll();
    setupHistoryAnimations();
    setupLightbox();
    setupMapEffects();
    setupResponsiveMenu();
    setupHeaderScrollEffect();
    setupActiveNavigation();
    
    // Aplica el filtro de género inicial después de que todo cargue
    setTimeout(() => {
        applyGenderFilter();
    }, 100);
    
    console.log('✓ HAUTE Website Initialized');
});