let isScrolling = false;
let profileDetail1 = document.getElementById('profileDetail1');
let profileDetail2 = document.getElementById('profileDetail2');
let profileDetail3 = document.getElementById('profileDetail3');
let contentChanged = false; 
let typingInProgress = false; 

// Function to scroll smoothly
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


// Function for typing effect with callback
function typeWriter(element, text, callback) {
    let i = 0;
    typingInProgress = true;
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        } else {
            typingInProgress = false;
            if (callback) {
                callback();
            }
        }
    }
    
    element.innerHTML = ''; // Clear existing content
    typing(); // Start typing effect
}

// Function to change profile detail content
function changeProfileDetailContent() {
    if (typingInProgress) return; // If typing is already in progress, return
    
    const newContent1 = '이름 : 최지설';
    const newContent2 = '생일 : 2006년 07월 31일';
    const newContent3 = '전화번호 : 010-6593-0730';

    // Type each content sequentially
    typeWriter(profileDetail1, newContent1, () => {
        typeWriter(profileDetail2, newContent2, () => {
            typeWriter(profileDetail3, newContent3, () => {
                contentChanged = true; 
            });
        });
    });
}

// Event listener for mouse wheel scroll
window.addEventListener('wheel', function(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        if (!contentChanged) {
            changeProfileDetailContent();
        } else {
            scrollToSection('down');
        }
    } else {
        scrollToSection('up');
    }
}, { passive: false });

// Event listener for keyboard arrow keys
window.addEventListener('keydown', function(event) {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!contentChanged) {
            changeProfileDetailContent();
        } else {
            scrollToSection('down');
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToSection('up');
    }
}, { passive: false });
