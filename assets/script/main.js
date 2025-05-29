$(function(){
    // Top 이동 버튼
    $('.top-btn').hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 250) {
            $('.top-btn').fadeIn();
        } else {
            $('.top-btn').fadeOut();
        }
    }); // 버튼 클릭시 
    $(".top-btn").click(function() { 
        $('html, body').animate({ scrollTop : 0 // 0 까지 animation 이동합니다. 
        }, 400); // 속도 400 
    return false; 
}); 

    if ($('section').hasClass('main-sec') || $('section').hasClass('service')) {
        $('header').removeClass('convert');
    } else {
        $('header').addClass('convert');
    }

    // Header 스크롤시 색상 변경
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });
    
    // MO header 슬라이드
    const menuBtn = $('header .menu-btn');
    var moInner = $('header .inner.mo');
    const closeBtn = $('header .close-btn');
    const maxMobileWidth = 768;

    function isMobile() {
        return window.innerWidth <= maxMobileWidth;
    }

    menuBtn.on('click', function () {
        if (isMobile()) {
            $('header .inner.mo').addClass('on');
        }
    });

    closeBtn.on('click', function () {
        if (isMobile()) {
            $('header .inner.mo').removeClass('on');
        }
    });

    $(window).on('resize', function () {
        if (!isMobile()) {
            $('header .inner.mo').removeClass('on');
            $('header .inner.mo').hide();
        } else {
            $('header .inner.mo').show();
        }
    });

    // MO header 키보드 탭
    function enableTabindex() {
        moInner.find('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])').each(function () {
            $(this).attr('tabindex', '-1');
        });
    }enableTabindex();

    function disableTabindex() {
        moInner.find('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])').each(function () {
            $(this).removeAttr('tabindex');
        });
    }

    menuBtn.on('click', function() {
        disableTabindex();
        $('header .inner.mo .logo a').focus();
    });
    
    closeBtn.on('click', function() {
        enableTabindex();
        menuBtn.focus();
    });

    // 자주 묻는 질문
    $('.qna .q-wrap').on('click', function(){
        if($(this).hasClass('on') == false) {
            $(this).addClass('on');
            $(this).siblings('.a-wrap').slideDown();
        } else {
            $(this).removeClass('on');
            $(this).siblings('.a-wrap').slideUp();
        }
    });

    $('.main-visual > .inner').addClass('fade-up-end');
    $('.sub-sec.visual > .inner').addClass('fade-up-end');

    // fade 인터렉션
    function fadeUpMotion(classname) {
        const $targets = $('.' + classname).not('.main-visual > .inner, .sub-sec.visual > .inner');
        const st = $(window).scrollTop();
        const winH = window.innerHeight;
        
        $targets.each(function () {
            const $el = $(this);
            const elTop = $el.offset().top;
            const elBottom = elTop + $el.outerHeight();
        
            const isVisible = elTop < st + winH && elBottom > st;
            const isBelowAndNotVisible = elTop > st + winH;
        
            if (isVisible) {
                $el.addClass('fade-up-end');
            } else if (isBelowAndNotVisible) {
                $el.removeClass('fade-up-end');
            }
        });
    }
        
    $(window).on('load resize scroll', function () {
        fadeUpMotion('fade-up');
        $('.main-visual > .inner').addClass('fade-up-end');
        $('.sub-sec.visual > .inner').addClass('fade-up-end');
    });

    // 메인 슬라이드
    const swiper = new Swiper('.main-slide', {
        slidesPerView: 1.3,  // 3개 + 다음 슬라이드 반 개
        spaceBetween: 8,
        centeredSlides: false,
        // loop: true,
        // loopAdditionalSlides: 1,
        // autoplay: true,
        breakpoints: {
            // 1400px 보다 클 경우
            1400: {
                slidesPerView: 3.5,
                spaceBetween: 30
            }, 
            1000: {
                slidesPerView: 2.5,
                spaceBetween: 20
            }, 
            768: {
                slidesPerView: 1.5,
                spaceBetween: 15
            }, 
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 첫번째 섹션 -> 두 번째 섹션 이동 효과
    function smoothScrollTo(targetY, duration = 700) {
        const startY = window.scrollY;
        const change = targetY - startY;
        const startTime = performance.now();

        function easeInOut(t) {
            return t < 0.5
                ? 2 * t * t
                : -1 + (4 - 2 * t) * t;
        }

        function animateScroll(currentTime) {
            const time = Math.min(1, (currentTime - startTime) / duration);
            const easedTime = easeInOut(time);
            window.scrollTo(0, startY + change * easedTime);

            if (time < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    function bindScrollBetweenSections(selector) {
        const sections = document.querySelectorAll(selector);
        const first = sections[0];
        const second = sections[1];

        if (first && second) {
            first.addEventListener('wheel', function (event) {
                const delta = event.wheelDelta
                    ? event.wheelDelta / 120
                    : -(event.detail || 0) / 3;

                if (delta < 0) { // 휠을 아래로 내렸을 때
                    event.preventDefault();
                    const moveTop = window.pageYOffset + second.getBoundingClientRect().top - 80;
                    smoothScrollTo(moveTop, 900);
                }
            }, { passive: false });
        }
    }
    // .main-sec과 .service 섹션 각각에 바인딩
    bindScrollBetweenSections('.main-sec');
    bindScrollBetweenSections('.service');

    // 커스텀 select
    function selectCustom() {
        $(".select-item").on("click", function (e) {
            e.preventDefault();
                if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $(this).siblings('.option-list').slideUp();
            } else {
                $('.select-item').removeClass('on').next('.option-list').slideUp();
                $(this).addClass('on');
                $(this).siblings('.option-list').slideDown();
            }
        });

        $(".option-list li").on("click", function (e) {
            e.preventDefault();
            const value = $(this).text();

            if (!$(this).hasClass('on')) {
                $(this).siblings('li').removeClass('on');
                $(this).addClass('on');
            }

            $(this).parents('.option-list').siblings('.select-item').html(value).css('color', '#000');
            $(this).parents('.option-list').slideUp().siblings('.select-item').removeClass('on');
            $(this).parents('.option-list').siblings('.direct-input').removeClass('on');
        });

        // 가격안내 페이지 select
        $(".select-box.type01 .option-list li").on("click", function (e) {
            e.preventDefault();
            const searchWrap = $(this).closest('.search-wrap');
            const tbWrap = $(this).closest('.sub-sec').find('.tb-wrap');
            const colors = ['blue', 'green', 'purple', 'orange'];

            // 현재 li에 있는 색상 클래스를 찾아서 적용
            const selectedColor = colors.find(color => $(this).hasClass(color));

            if (selectedColor) {
                searchWrap.removeClass(colors.join(' ')).addClass(selectedColor);
                tbWrap.removeClass(colors.join(' ')).addClass(selectedColor);
            }
        });

    }selectCustom();

    // 파일명 불러오기
    $('input[type=file]').change(function(e){
        $(this).siblings(".input-name").val(e.target.files[0].name);
    });

});
