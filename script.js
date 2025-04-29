document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".carousel-image");
    let index = 0;

    function changeImage() {
        images.forEach(img => img.style.display = "none");
        images[index].style.display = "block";
        index = (index + 1) % images.length;
    }

    setInterval(changeImage, 3000);
    changeImage();
});

  // Check for saved theme in localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  const toggleButton = document.getElementById('themeToggle');
  toggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    // Save the preference
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

