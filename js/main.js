        // Sticky header with glassmorphism effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Tombol Lihat Lokasi (2x klik)
        const locationBtn = document.getElementById('locationBtn');
        let clickCount = 0;
        
        locationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clickCount++;
            
            if (clickCount === 1) {
                // Klik pertama - ubah teks
                this.querySelector('.text').style.display = 'none';
                this.querySelector('.hover-text').style.display = 'inline';
                
                // Reset setelah 3 detik jika tidak ada klik kedua
                setTimeout(() => {
                    if (clickCount === 1) {
                        clickCount = 0;
                        this.querySelector('.text').style.display = 'inline';
                        this.querySelector('.hover-text').style.display = 'none';
                    }
                }, 3000);
            } else if (clickCount === 2) {
                // Klik kedua - buka Google Maps
                window.location.href = 'https://maps.app.goo.gl/bY2KpmC8s7ytgyku6';
            }
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Gallery Lightbox Effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });

        // Service Card Animation on Scroll
        const serviceCards = document.querySelectorAll('.service-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
