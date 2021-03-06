// navigation menu

const MENU_BTN = document.querySelector(".menu-btn");
const NAVIGATION = document.querySelector(".navigation");

MENU_BTN.addEventListener("click", () => {
    MENU_BTN.classList.toggle("active");
    NAVIGATION.classList.toggle("active");
});



// pagination

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));

}

$(function() {
    var numberOfItems = $(".card-content .card").length;
    var limitPerPage = 3; // how many cards items visible per a page
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 7; // how many page elements visible in the pagination
    var currentPage;

    function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false;
        currentPage = whichPage;

        $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }

    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link")
            .attr({ href: "javascript:void(0)" }).text("Prev")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link")
            .attr({ href: "javascript:void(0)" }).text("Next")),
    );

    $(".card-content").show();
    showPage(1);

    $(document).on("click", ".pagination li.current-page:not(.active)", function() {
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function() {
        return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function() {
        return showPage(currentPage - 1);
    });

});



// navigation slide image

const SLIDER = document.querySelector(".slider");
const PREV_BTN = document.querySelector(".prev-btn");
const NEXT_BTN = document.querySelector(".next-btn");
const SLIDES = document.querySelectorAll(".slide");
const SLIDE_ICONS = document.querySelectorAll(".slide-icon");
const NUMBER_OF_SLIDES = SLIDES.length;

var slideNumber = 0;

// image slide next button
NEXT_BTN.addEventListener('click', () => {
    SLIDES.forEach((slide) => {
        slide.classList.remove("active");
    });

    SLIDE_ICONS.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });


    slideNumber++;

    if (slideNumber > (NUMBER_OF_SLIDES - 1)) {
        slideNumber = 0;
    }

    SLIDES[slideNumber].classList.add("active");
    SLIDE_ICONS[slideNumber].classList.add("active");
});

// image slide previsous button
PREV_BTN.addEventListener('click', () => {
    SLIDES.forEach((slide) => {
        slide.classList.remove("active");
    });

    SLIDE_ICONS.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });


    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = NUMBER_OF_SLIDES - 1;
    }

    SLIDES[slideNumber].classList.add("active");
    SLIDE_ICONS[slideNumber].classList.add("active");
});

// image slide autoplay
var playSlider;

var repeater = () => {
    playSlider = setInterval(function() {
        SLIDES.forEach((slide) => {
            slide.classList.remove("active");
        });

        SLIDE_ICONS.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });


        slideNumber++;

        if (slideNumber > (NUMBER_OF_SLIDES - 1)) {
            slideNumber = 0;
        }

        SLIDES[slideNumber].classList.add("active");
        SLIDE_ICONS[slideNumber].classList.add("active");
    }, 4000);
}
repeater();

// stop the image slider autoplay on mouseover
SLIDER.addEventListener("mouseover", () => {
    clearInterval(playSlider);
});

// start the image slider autoplay again on mouseout
SLIDER.addEventListener("mouseout", () => {
    repeater();
});