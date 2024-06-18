let isScrolling = false;

// 스크롤 자동 내려감 애니메이션
function scrollToSection(direction) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    let targetPosition;

    if (direction === 'down') {
        targetPosition = scrollPosition + viewportHeight * 1.01;
    } else if (direction === 'up') {
        targetPosition = scrollPosition - viewportHeight * 1.01;
    }

    isScrolling = true;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// 배경 그라데이션 흐려짐 애니메이션
function updateBackgroundGradient() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / documentHeight;

    const startColor = [100, 153, 233]; 
    const endColor = [255, 255, 255]; 
    const currentColor = startColor.map((start, index) => {
        const end = endColor[index];
        const current = start + (end - start) * scrollPercentage;
        return Math.round(current);
    });

    const currentColorString = `rgb(${currentColor.join(',')})`;

    if (scrollPosition > 0) {
        document.body.style.background = `linear-gradient(to bottom, ${currentColorString}, white)`;
    } else {
        document.body.style.background = `rgb(${startColor.join(',')})`;
    }
}

// 스크롤 효과 적용
window.addEventListener('wheel', function(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        scrollToSection('down');
    } else {
        scrollToSection('up');
    }
}, { passive: false });

window.addEventListener('keydown', function(event) {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToSection('down');
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToSection('up');
    }
}, { passive: false });

window.addEventListener('scroll', updateBackgroundGradient);
