/* =========================================================
   TEACHER'S DAY INTERACTIVE CARD
   COMPLETE + CORRECTED script.js
   Includes Classroom Door Opening Animation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    console.log("🍎 Teacher's Day Card Started");

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loadingScreen = document.getElementById("loadingScreen");
    const introScreen = document.getElementById("introScreen");
    const app = document.getElementById("app");

    const startButton = document.getElementById("startButton");
    const homeButton = document.getElementById("homeButton");
    const musicButton = document.getElementById("musicButton");

    /* Door animation */
    const doorAnimation = document.getElementById("doorAnimation");

    const pages = Array.from(document.querySelectorAll(".page"));

    const teacherSong = document.getElementById("teacherSong");
    const playSong = document.getElementById("playSong");
    const songProgress = document.getElementById("songProgress");
    const songTime = document.getElementById("songTime");

    const photoModal = document.getElementById("photoModal");

    const closePhotoModal =
        document.getElementById("closePhotoModal");

    const modalOverlay = photoModal
        ? photoModal.querySelector(".modal-overlay")
        : null;

    const modalPhoto =
        document.getElementById("modalPhoto");

    const modalPhotoTitle =
        document.getElementById("modalPhotoTitle");

    const modalPhotoDescription =
        document.getElementById("modalPhotoDescription");

    const celebration =
        document.getElementById("celebration");

    const closeCelebration =
        document.getElementById("closeCelebration");

    const celebrateButton =
        document.getElementById("celebrateButton");

    const restartButton =
        document.getElementById("restartButton");

    const cursorHeart =
        document.getElementById("cursorHeart");

    let currentPage = "classroom";
    let doorAnimationRunning = false;


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    function hideLoadingScreen() {

        if (!loadingScreen) {
            return;
        }

        loadingScreen.classList.add("hidden");

        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 700);
    }

    /*
       Hide loading screen even if external resources
       such as Google Fonts or music fail.
    */
    setTimeout(hideLoadingScreen, 1200);

    window.addEventListener("load", () => {
        setTimeout(hideLoadingScreen, 300);
    });


    /* =====================================================
       PAGE SETUP
    ===================================================== */

    function hideAllPages() {

        pages.forEach((page) => {

            page.classList.remove("active-page");
            page.classList.remove("active");

            page.setAttribute(
                "aria-hidden",
                "true"
            );

        });

    }


    /* =====================================================
       SHOW PAGE
    ===================================================== */

    function showPage(pageId) {

        if (!pageId) {
            return;
        }

        const targetPage =
            document.getElementById(pageId);

        if (
            !targetPage ||
            !targetPage.classList.contains("page")
        ) {

            console.warn(
                "Page not found:",
                pageId
            );

            return;
        }

        hideAllPages();

        targetPage.classList.add("active-page");
        targetPage.classList.add("active");

        targetPage.setAttribute(
            "aria-hidden",
            "false"
        );

        currentPage = pageId;

        console.log(
            "📖 Opening page:",
            pageId
        );

        /*
           Scroll the application to the top.
        */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /*
           Restart simple reveal animations.
        */
        const animatedElements =
            targetPage.querySelectorAll(
                ".animate-item, .fade-up, .reveal, .stagger-item"
            );

        animatedElements.forEach(
            (element, index) => {

                element.style.animationDelay =
                    `${index * 0.08}s`;

                element.classList.remove(
                    "animate-in"
                );

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        element.classList.add(
                            "animate-in"
                        );

                    });

                });

            }
        );

    }


    /* =====================================================
       OPEN APPLICATION
    ===================================================== */

    function openApplication() {

        if (introScreen) {

            introScreen.classList.remove(
                "active"
            );

            introScreen.classList.add(
                "hidden"
            );

        }

        if (app) {

            app.classList.remove(
                "hidden"
            );

        }

        showPage("classroom");

        console.log(
            "🎉 Application opened"
        );

    }


    /* =====================================================
       DOOR ANIMATION
    ===================================================== */

    function playDoorAnimation() {

        /*
           If the door animation HTML does not exist,
           simply open the application normally.
        */
        if (!doorAnimation) {

            console.warn(
                "⚠️ #doorAnimation was not found. Opening application normally."
            );

            openApplication();

            return;

        }

        /*
           Prevent double clicking while animation
           is already running.
        */
        if (doorAnimationRunning) {
            return;
        }

        doorAnimationRunning = true;

        /*
           Make sure the door starts from a clean state.
        */
        doorAnimation.classList.remove(
            "opening",
            "exit"
        );

        /*
           Display the door.
        */
        doorAnimation.classList.add(
            "active"
        );

        doorAnimation.setAttribute(
            "aria-hidden",
            "false"
        );

        /*
           Force browser reflow so the animation
           reliably starts from the beginning.
        */
        void doorAnimation.offsetWidth;

        /*
           Start opening the two doors.
        */
        setTimeout(() => {

            doorAnimation.classList.add(
                "opening"
            );

        }, 150);

        /*
           Once the doors are mostly open,
           reveal the classroom/application.
        */
        setTimeout(() => {

            openApplication();

        }, 1000);

        /*
           Fade the door animation away.
        */
        setTimeout(() => {

            doorAnimation.classList.add(
                "exit"
            );

        }, 1700);

        /*
           Completely reset the door overlay.
        */
        setTimeout(() => {

            doorAnimation.classList.remove(
                "active",
                "opening",
                "exit"
            );

            doorAnimation.setAttribute(
                "aria-hidden",
                "true"
            );

            doorAnimationRunning = false;

        }, 2500);

    }


    /* =====================================================
       START BUTTON
    ===================================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                /*
                   Make sure loading screen is gone.
                */
                hideLoadingScreen();

                /*
                   PLAY DOOR ANIMATION FIRST.
                   The classroom opens behind it.
                */
                playDoorAnimation();

            }
        );

    } else {

        console.warn(
            "⚠️ #startButton was not found."
        );

    }


    /* =====================================================
       HOME BUTTON
    ===================================================== */

    if (homeButton) {

        homeButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closePhotoModalFunction();
                closeCelebrationFunction();

                if (
                    teacherSong &&
                    !teacherSong.paused
                ) {

                    teacherSong.pause();

                }

                updateMusicButton();

                /*
                   Show the classroom inside the app.
                */
                if (app) {

                    app.classList.remove(
                        "hidden"
                    );

                }

                if (introScreen) {

                    introScreen.classList.add(
                        "hidden"
                    );

                }

                showPage("classroom");

            }
        );

    }


    /* =====================================================
       DATA-NEXT NAVIGATION
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-next]"
                );

            if (!button) {
                return;
            }

            event.preventDefault();

            const target =
                button.getAttribute(
                    "data-next"
                );

            if (!target) {
                return;
            }

            showPage(target);

        }
    );


    /* =====================================================
       DATA-BACK NAVIGATION
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-back]"
                );

            if (!button) {
                return;
            }

            event.preventDefault();

            const target =
                button.getAttribute(
                    "data-back"
                );

            if (!target) {
                return;
            }

            showPage(target);

        }
    );


    /* =====================================================
       CLASSROOM QUICK ACTIONS
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-open]"
                );

            if (!button) {
                return;
            }

            event.preventDefault();

            const target =
                button.getAttribute(
                    "data-open"
                );

            if (!target) {
                return;
            }

            showPage(target);

        }
    );


    /* =====================================================
       MUSIC BUTTON
    ===================================================== */

    async function toggleMusic() {

        if (!teacherSong) {

            console.warn(
                "⚠️ Teacher song audio element not found."
            );

            return;
        }

        try {

            if (teacherSong.paused) {

                await teacherSong.play();

            } else {

                teacherSong.pause();

            }

            updateMusicButton();

        } catch (error) {

            console.error(
                "🎵 Audio playback error:",
                error
            );

        }

    }


    function updateMusicButton() {

        if (
            !musicButton ||
            !teacherSong
        ) {
            return;
        }

        if (teacherSong.paused) {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.textContent =
                "🎵";

            musicButton.setAttribute(
                "aria-label",
                "Play music"
            );

        } else {

            musicButton.classList.add(
                "playing"
            );

            musicButton.textContent =
                "⏸️";

            musicButton.setAttribute(
                "aria-label",
                "Pause music"
            );

        }

    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                toggleMusic();

            }
        );

    }


    if (teacherSong) {

        teacherSong.addEventListener(
            "play",
            updateMusicButton
        );

        teacherSong.addEventListener(
            "pause",
            updateMusicButton
        );

        teacherSong.addEventListener(
            "ended",
            () => {

                updateMusicButton();

                if (songProgress) {

                    songProgress.style.width =
                        "0%";

                }

                if (songTime) {

                    songTime.textContent =
                        "0:00";

                }

            }
        );

    }


    /* =====================================================
       SONG PLAY BUTTON
    ===================================================== */

    async function toggleSong() {

        if (!teacherSong) {

            console.warn(
                "⚠️ Music file not found."
            );

            return;
        }

        try {

            if (teacherSong.paused) {

                await teacherSong.play();

            } else {

                teacherSong.pause();

            }

            updatePlayButton();

        } catch (error) {

            console.error(
                "Unable to play teacher song:",
                error
            );

            if (songTime) {

                songTime.textContent =
                    "Music unavailable";

            }

        }

    }


    function updatePlayButton() {

        if (
            !playSong ||
            !teacherSong
        ) {
            return;
        }

        if (teacherSong.paused) {

            playSong.textContent =
                "▶";

            playSong.setAttribute(
                "aria-label",
                "Play song"
            );

        } else {

            playSong.textContent =
                "⏸";

            playSong.setAttribute(
                "aria-label",
                "Pause song"
            );

        }

    }


    if (playSong) {

        playSong.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                toggleSong();

            }
        );

    }


    /* =====================================================
       SONG PROGRESS
    ===================================================== */

    if (teacherSong) {

        teacherSong.addEventListener(
            "loadedmetadata",
            () => {

                if (songTime) {

                    songTime.textContent =
                        formatTime(
                            teacherSong.currentTime
                        );

                }

            }
        );


        teacherSong.addEventListener(
            "timeupdate",
            () => {

                const duration =
                    teacherSong.duration;

                const current =
                    teacherSong.currentTime;

                if (
                    Number.isFinite(duration) &&
                    duration > 0
                ) {

                    const percentage =
                        (current / duration) * 100;

                    if (songProgress) {

                        songProgress.style.width =
                            `${percentage}%`;

                    }

                }

                if (songTime) {

                    songTime.textContent =
                        formatTime(current);

                }

            }
        );

    }


    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            `${minutes}:` +
            `${remainingSeconds
                .toString()
                .padStart(2, "0")}`
        );

    }


    /* =====================================================
       CLICK ON SONG PROGRESS BAR
    ===================================================== */

    const songProgressContainer =
        document.querySelector(
            ".song-progress"
        );

    if (
        songProgressContainer &&
        teacherSong
    ) {

        songProgressContainer.addEventListener(
            "click",
            (event) => {

                if (
                    !Number.isFinite(
                        teacherSong.duration
                    ) ||
                    teacherSong.duration <= 0
                ) {

                    return;

                }

                const rect =
                    songProgressContainer
                        .getBoundingClientRect();

                const clickPosition =
                    event.clientX -
                    rect.left;

                const percentage =
                    clickPosition /
                    rect.width;

                teacherSong.currentTime =
                    percentage *
                    teacherSong.duration;

            }
        );

    }


    /* =====================================================
       PHOTO MODAL
    ===================================================== */

    const photoCards =
        document.querySelectorAll(
            ".photo-card"
        );


    const photoData = {

        1: {
            icon: "📸",
            title:
                "A Beautiful Classroom Memory",
            description:
                "A special classroom moment worth remembering forever."
        },

        2: {
            icon: "😊",
            title:
                "Smiles & Laughter",
            description:
                "The smiles and laughter that made every day special."
        },

        3: {
            icon: "🌸",
            title:
                "Moments Worth Remembering",
            description:
                "Some little moments become the biggest memories."
        },

        4: {
            icon: "❤️",
            title:
                "Thank You For Everything",
            description:
                "A heartfelt thank you for every lesson and every moment."
        },

        5: {
            icon: "🎓",
            title:
                "Learning Together",
            description:
                "The journey of learning is beautiful when shared with an amazing teacher."
        },

        6: {
            icon: "✨",
            title:
                "A Moment To Cherish",
            description:
                "A beautiful memory that deserves a special place in our hearts."
        }

    };


    function openPhotoModal(photoNumber) {

        if (!photoModal) {
            return;
        }

        const data =
            photoData[photoNumber] ||
            photoData[1];

        if (modalPhoto) {

            modalPhoto.textContent =
                data.icon;

        }

        if (modalPhotoTitle) {

            modalPhotoTitle.textContent =
                data.title;

        }

        if (modalPhotoDescription) {

            modalPhotoDescription.textContent =
                data.description;

        }

        photoModal.classList.add(
            "active"
        );

        photoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closePhotoModalFunction() {

        if (!photoModal) {
            return;
        }

        photoModal.classList.remove(
            "active"
        );

        photoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    photoCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    const number =
                        card.getAttribute(
                            "data-photo"
                        );

                    openPhotoModal(number);

                }
            );

        }
    );


    if (closePhotoModal) {

        closePhotoModal.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closePhotoModalFunction();

            }
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closePhotoModalFunction
        );

    }


    /* =====================================================
       CELEBRATION
    ===================================================== */

    function createConfetti() {

        if (!celebration) {
            return;
        }

        const container =
            celebration.querySelector(
                ".confetti-container"
            );

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const symbols = [
            "🎉",
            "✨",
            "❤️",
            "💖",
            "⭐",
            "🌸",
            "🎓",
            "🎊"
        ];

        for (let i = 0; i < 70; i++) {

            const piece =
                document.createElement(
                    "span"
                );

            piece.className =
                "confetti-piece";

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            piece.style.left =
                `${Math.random() * 100}%`;

            piece.style.animationDelay =
                `${Math.random() * 2}s`;

            piece.style.animationDuration =
                `${2 + Math.random() * 3}s`;

            container.appendChild(
                piece
            );

        }

    }


    function openCelebrationFunction() {

        if (!celebration) {
            return;
        }

        createConfetti();

        celebration.classList.add(
            "active"
        );

        celebration.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "celebration-open"
        );

    }


    function closeCelebrationFunction() {

        if (!celebration) {
            return;
        }

        celebration.classList.remove(
            "active"
        );

        celebration.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "celebration-open"
        );

    }


    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openCelebrationFunction();

            }
        );

    }


    if (closeCelebration) {

        closeCelebration.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closeCelebrationFunction();

            }
        );

    }


    /* =====================================================
       RESTART
    ===================================================== */

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                /*
                   Stop music.
                */
                if (
                    teacherSong &&
                    !teacherSong.paused
                ) {

                    teacherSong.pause();
                    teacherSong.currentTime = 0;

                }

                updateMusicButton();
                updatePlayButton();

                /*
                   Close overlays.
                */
                closePhotoModalFunction();
                closeCelebrationFunction();

                /*
                   Reset door animation.
                */
                if (doorAnimation) {

                    doorAnimation.classList.remove(
                        "active",
                        "opening",
                        "exit"
                    );

                    doorAnimation.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

                doorAnimationRunning = false;

                /*
                   Hide application.
                */
                if (app) {

                    app.classList.add(
                        "hidden"
                    );

                }

                /*
                   Show intro screen.
                */
                if (introScreen) {

                    introScreen.classList.remove(
                        "hidden"
                    );

                    introScreen.classList.add(
                        "active"
                    );

                }

                currentPage =
                    "classroom";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
               Escape closes overlays.
            */
            if (event.key === "Escape") {

                closePhotoModalFunction();
                closeCelebrationFunction();

                return;

            }


            /*
               Don't navigate while typing.
            */
            const target =
                event.target;

            if (
                target &&
                (
                    target.matches("input") ||
                    target.matches("textarea") ||
                    target.matches("select")
                )
            ) {

                return;

            }


            /*
               Arrow navigation.
            */
            if (event.key === "ArrowRight") {

                const nextButton =
                    document.querySelector(
                        `#${currentPage} [data-next]`
                    );

                if (nextButton) {

                    nextButton.click();

                }

            }


            if (event.key === "ArrowLeft") {

                const backButton =
                    document.querySelector(
                        `#${currentPage} [data-back]`
                    );

                if (backButton) {

                    backButton.click();

                }

            }

        }
    );


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    let touchStartX = null;


    document.addEventListener(
        "touchstart",
        (event) => {

            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {

                return;

            }

            touchStartX =
                event.changedTouches[0].clientX;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            if (
                touchStartX === null ||
                !event.changedTouches ||
                !event.changedTouches.length
            ) {

                return;

            }

            const touchEndX =
                event.changedTouches[0].clientX;

            const distance =
                touchStartX -
                touchEndX;

            touchStartX = null;

            if (
                Math.abs(distance) < 70
            ) {

                return;

            }


            /*
               Find current page navigation.
            */

            if (distance > 0) {

                const nextButton =
                    document.querySelector(
                        `#${currentPage} [data-next]`
                    );

                if (nextButton) {

                    nextButton.click();

                }

            } else {

                const backButton =
                    document.querySelector(
                        `#${currentPage} [data-back]`
                    );

                if (backButton) {

                    backButton.click();

                }

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       CURSOR HEART EFFECT
    ===================================================== */

    if (cursorHeart) {

        document.addEventListener(
            "mousemove",
            (event) => {

                cursorHeart.style.left =
                    `${event.clientX}px`;

                cursorHeart.style.top =
                    `${event.clientY}px`;

            }
        );


        document.addEventListener(
            "click",
            (event) => {

                const heart =
                    document.createElement(
                        "span"
                    );

                heart.className =
                    "click-heart";

                heart.textContent =
                    "❤️";

                heart.style.left =
                    `${event.clientX}px`;

                heart.style.top =
                    `${event.clientY}px`;

                document.body.appendChild(
                    heart
                );

                setTimeout(() => {

                    heart.remove();

                }, 1000);

            }
        );

    }


    /* =====================================================
       INITIAL PAGE STATE
    ===================================================== */

    /*
       The intro screen should be visible initially.
    */

    if (introScreen) {

        introScreen.classList.add(
            "active"
        );

        introScreen.classList.remove(
            "hidden"
        );

    }


    if (app) {

        app.classList.add(
            "hidden"
        );

    }


    /*
       Make sure door is hidden initially.
    */

    if (doorAnimation) {

        doorAnimation.classList.remove(
            "active",
            "opening",
            "exit"
        );

        doorAnimation.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
       Hide all internal pages first.
    */

    hideAllPages();


    /*
       Classroom is the first application page.
    */

    const classroom =
        document.getElementById(
            "classroom"
        );

    if (classroom) {

        classroom.classList.add(
            "active-page"
        );

        classroom.classList.add(
            "active"
        );

        classroom.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    updateMusicButton();
    updatePlayButton();


    console.log(
        "✅ Teacher's Day card initialized successfully"
    );

});