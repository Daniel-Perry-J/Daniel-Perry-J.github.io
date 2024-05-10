// Function to generate stars
function generateStars(numberOfStars) {
    const starryBg = document.querySelector('.starry-bg');
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${Math.random() * 5 + 2}s linear infinite`;
      starryBg.appendChild(star);
    }
  }

  // Call the function to generate 100 stars
  generateStars(200);

  // Add CSS for twinkling effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 1; }
      25%, 75% { opacity: 0.5; }
      50% { opacity: 0.25; }
    }
  `;
  document.head.appendChild(style);