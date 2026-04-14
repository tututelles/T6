class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.updateProgressBar();
    }

    bindEvents() {
        // Botões de navegação
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause no hover
        const heroContent = document.querySelector('.hero-content');
        heroContent.addEventListener('mouseenter', () => this.pauseAutoPlay());
        heroContent.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        this.updateCarousel();
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prevSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const progress = document.querySelector('.progress');

        // Atualizar slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index === (this.currentSlide - 1 + this.totalSlides) % this.totalSlides) {
                slide.classList.add('prev');
            }
        });

        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Atualizar barra de progresso
        this.updateProgressBar();

        // Reset transição
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    updateProgressBar() {
        const progress = document.querySelector('.progress');
        const progressPercent = ((this.currentSlide + 1) / this.totalSlides) * 100;
        progress.style.width = progressPercent + '%';
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});