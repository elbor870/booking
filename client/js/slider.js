document.addEventListener("DOMContentLoaded", () => {
    const reviews = document.querySelectorAll(".review-card");
    const prevButton = document.querySelector(".reviews__button--prev");
    const nextButton = document.querySelector(".reviews__button--next");
    const dots = document.querySelectorAll(".reviews__dot");

    let currentIndex = 0;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.classList.toggle("review-card--active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("reviews__dot--active", i === index);
        });
    }

    function nextReview() {
        currentIndex++;

        if (currentIndex >= reviews.length) {
            currentIndex = 0;
        }

        showReview(currentIndex);
    }

    function previousReview() {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = reviews.length - 1;
        }

        showReview(currentIndex);
    }

    prevButton.addEventListener("click", previousReview);
    nextButton.addEventListener("click", nextReview);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showReview(currentIndex);
        });
    });

    showReview(currentIndex);
});

