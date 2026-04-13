const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();
}

const header = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const nodes = document.querySelectorAll('.node-card');
const mapContainer = document.querySelector('.map-container');
const lines = [document.getElementById('line-0'), document.getElementById('line-1')];

function updateLines() {
    nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();
        
        const x = ((rect.left + rect.width / 2) - containerRect.left) / containerRect.width * 100;
        const y = ((rect.top + rect.height / 2) - containerRect.top) / containerRect.height * 100;

        if (index === 0 && lines[0]) {
            lines[0].setAttribute('x1', x + '%');
            lines[0].setAttribute('y1', y + '%');
        }
        if (index === 1) {
            if (lines[0]) {
                lines[0].setAttribute('x2', x + '%');
                lines[0].setAttribute('y2', y + '%');
            }
            if (lines[1]) {
                lines[1].setAttribute('x1', x + '%');
                lines[1].setAttribute('y1', y + '%');
            }
        }
        if (index === 2 && lines[1]) {
            lines[1].setAttribute('x2', x + '%');
            lines[1].setAttribute('y2', y + '%');
        }
    });
}

function initJellyDrag(elements, isMapNode = false) {
    elements.forEach(el => {
        let state = {
            isDragging: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0
        };

        el.addEventListener('pointerdown', (e) => {
            state.isDragging = true;
            el.classList.add('grabbing');
            
            elements.forEach(item => item.style.zIndex = "10");
            el.style.zIndex = "1000";

            state.startX = e.clientX - state.currentX;
            state.startY = e.clientY - state.currentY;

            el.setPointerCapture(e.pointerId);
            el.style.transition = 'none';
        });

        el.addEventListener('pointermove', (e) => {
            if (!state.isDragging) return;

            const x = e.clientX - state.startX;
            const y = e.clientY - state.startY;

            const diffX = x - state.currentX;
            const skewX = Math.max(Math.min(diffX * 0.5, 15), -15);
            const scaleY = 1 + Math.min(Math.abs(diffX) * 0.003, 0.2);

            state.currentX = x;
            state.currentY = y;

            el.style.transform = `translate(${x}px, ${y}px) skewX(${skewX}deg) scaleY(${scaleY})`;
            
            if (isMapNode) updateLines();
        });

        el.addEventListener('pointerup', () => {
            if (!state.isDragging) return;
            state.isDragging = false;
            el.classList.remove('grabbing');

            if (isMapNode) {
                el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                state.currentX = 0;
                state.currentY = 0;
                el.style.transform = `translate(0px, 0px)`;
                
                const start = performance.now();
                const animate = (t) => {
                    updateLines();
                    if (t - start < 800) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            } else {
                el.style.transition = 'transform 0.5s ease';
                el.style.transform = `translate(${state.currentX}px, ${state.currentY}px) scale(1) skew(0)`;
            }
        });
    });
}

initJellyDrag(nodes, true); 
const freeCards = document.querySelectorAll('.drag-item-free');
initJellyDrag(freeCards, false); 

window.addEventListener('load', updateLines);
window.addEventListener('resize', updateLines);