$(document).ready(function() {
    // Check to see if Media-Queries are supported
    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-default');
            $('.theme-switch').prop('checked', true);
        } else {
            document.body.classList.add('theme-light');
            $('.theme-switch').prop('checked', false);
        }
    } else {
        // Default (when Media-Queries are not supported)
        document.body.classList.remove('theme-dark');
        document.body.classList.remove('theme-light');
    }

    $('body').on('click', '#theme-switch', function(e) {
        console.log($(this).prop('checked'))
        $(this).prop('checked') == true ? $('body').addClass('theme-dark').removeClass('theme-default theme-light') : $('body').addClass('theme-light').removeClass('theme-dark');
    })

    // анимация меню
	$('.menu').click(function(e){
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');

        $('.header-mob').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header-mob, .menu').removeClass('active');
            }
        });
    });

    // анимация навигационного меню на странице билда
	$('.aside-navigation-menu').click(function(e){
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');

        $('.aside-navigation').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.aside-navigation, .navigation-menu, .aside-navigation-menu, .aside-navigation-parameters');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.aside-navigation, .aside-navigation-menu').removeClass('active');
            }
        });
    });

    // выпадающие меню
    $('body').on('click', '.dropdown', function(){
        let $this = $(this);
        $this.toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.dropdown, .dropdown-current');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.removeClass('active');
            }
        });
    });

    // якоря для ссылок
    $('.anchor[href^="#"]').click(function () {
        $('.header-mob, .menu, .aside-navigation, .aside-navigation-menu').removeClass('active'); 

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 600, 'swing' );
        return false;
    });

    // кнопка раскрытия/сворачивания
    $('.update-build-block .button-open').on('click', function(e) {
        e.preventDefault();
        (this.parentElement.classList.contains('open') === true) ? this.parentElement.classList.remove('open') : this.parentElement.classList.add('open');
        let textBtnExpand = $(this).text();
        $(this).text(textBtnExpand == "Показать все" ? "Скрыть" : "Показать все");
    });

    // аккордеон
    function openAccordion() {
        let wrap = $('.accordion-block');
        let accordion = wrap.find('.accordion-title');

        accordion.on('click', function (e) {
            e.preventDefault();
            let $this = $(this);
            let $parent = $(this).parent();
            let wrapper = $(this).parents('.accordion-block');
            let content = $this.next();

            if (content.is(':visible')) {
                if(wrapper.hasClass('single-accordion')) {
                    wrapper.children().find('.accordion-title').removeClass('active');
                    wrapper.children().find('.accordion-title').next().slideUp('fast');
                }
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                if(wrapper.hasClass('single-accordion')) {
                    wrapper.children().find('.accordion-title').removeClass('active');
                    wrapper.children().find('.accordion-title').next().slideUp('fast');
                }
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // youtube lazyload
    let youtube = document.querySelectorAll(".youtube");
    for (let i = 0; i < youtube.length; i++) {
        let source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/maxresdefault.jpg";
        let image = new Image();
        image.src = source;
        image.addEventListener("load", function() {
            youtube[i].appendChild(image);
        }(i));
        youtube[i].addEventListener("click", function() {
            let iframe = document.createElement("iframe");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
            iframe.setAttribute("allow", "autoplay");
            this.innerHTML = "";
            this.appendChild(iframe);
        });
    }

    // навигационное меню
    $(window).on('scroll load', function () {
        let top = $(window).scrollTop();
        $('.anchor-block').each(function() {
            let destination = $(this).offset().top - 250;
            if(top >= destination) {
                let id = $(this).attr('id');
                $('.navigation-menu-link.anchor[href^="#"]').removeClass('active');
                $('.navigation-menu-link.anchor[href^="#'+ id +'"]').addClass('active');
                $('.anchor-block').removeClass('active');
                $('.anchor-block[id="'+ id +'"]').addClass('active');
            }
        });
    }).trigger('scroll');
    if ((window.location.hash !== '' && window.location.hash !== '#!') && $('.aside-navigation').length) {
        setTimeout(function() {
            $('.anchor-block').removeClass('active');
            if($('.anchor-block[id="'+ window.location.hash.replace(/#/, '') +'"]').length) {
                $('.anchor-block[id="'+ window.location.hash.replace(/#/, '') +'"]').addClass('active');
            }

            let goto = $(window.location.hash).offset().top;
            $('html, body').animate({ scrollTop: goto }, 600, 'swing');
        }, 100);
    }

    // параметры билда
    $('body').on('click', '.js-button-build-parameters', function(e){
        e.preventDefault();
        $('.aside-navigation-parameters').addClass('active');
        $('body').on('click', function (e) {
            let div = $('.aside-navigation-parameters, .js-button-build-parameters');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.aside-navigation-parameters').removeClass('active');
            }
        });
    });

    // селект лиги
    if($('.aside-navigation-parameter-select').length) {
        NiceSelect.bind(document.getElementById("select-league"), {
        
        });
    }

    // табы
    $('body').on('click','.tab-trigger', function(e){
        e.preventDefault();
        $(this).parent().find('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $(this).parent().find('.tab').removeClass('active');
        $(this).addClass('active');
        $(this).parent().next().find('.tab-item').removeClass('active');
        $(this).parent().next().find('.tab-item[data-tab="'+ tab +'"]').addClass('active');
    });

    // кнопка копирования
    new ClipboardJS('.copy-link');

    // new ClipboardJS('.copy-link', {
    //     text: function() {
    //         return alert('Скопировано');
    //     }
    // });

    // if ($('.copy-link').length) {
    //     $('.copy-link').click(function() {
    //         let $this = $(this);
    //         let code = $(this).siblings('.copied-code').text().trim();

    //         new ClipboardJS('.copy-link', {
    //             text: function() {
    //                 return alert('Скопировано');
    //             }
    //         });

    //         $this.addClass('copied');
    //         setTimeout(function() {
    //             $this.removeClass('copied')
    //         }, 3000)
    //     });
    // }

    // слайдер
    let swiper = new Swiper('.slider-images', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // fancybox
    Fancybox.bind("[data-fancybox]", {
        // options
    });

    // тултипы
    $('body').on('click', '.tooltip-trigger', function(e){
        e.preventDefault();
        let $this = $(this);
        let tooltip = $this.siblings('.tooltip');
        tooltip.toggleClass('active');
        $('body').on('click', function (e) {
            let div = $($this, tooltip);

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                tooltip.removeClass('active');
            }
        });
    });

    // медальки и всплывающие тултипы на новой странице эксперта
    $('body').on('click', '.expert-page-medal-img', function(){
        $this = $(this);
        if(!$this.siblings('.expert-page-medal-tooltip').hasClass('active')) {
            $('.expert-page-medal-tooltip').removeClass('active');
            $this.siblings('.expert-page-medal-tooltip').addClass('active');
        } else $this.siblings('.expert-page-medal-tooltip').removeClass('active')

        $('body').on('click', function (e) {
            var div = $('.expert-page-medal');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.siblings('.expert-page-medal-tooltip').removeClass('active');
            }
        });
    });

    // комментарии
    $('.comment-reply-btn').click(function() {
        let reply_id = $(this).attr('target');
        let article_id = $(this).attr('article');
        let comment_root = $(this).parent().parent();
        let reply_author = comment_root.find(".comment-author").text();
        let comment_reply_html = '<span class="comment-reply-info">Ответ на <span class="comment-reply-name-ref">' + reply_author + '</span><i class="material-icons">close</i></span>';
        $(".comment-reply-info").remove();
        $("#user-comment-name").after(comment_reply_html);
        $('#comment input[name="reply_id"]').val(reply_id);
        $("#comment").detach().appendTo(comment_root);
    });
    $("#add-comment-btn").click(function(e) {
        e.preventDefault();
        sendAjaxForm("user_comment_form", "/lk/comment/", true, "Комментарий добавлен<br>Страница будет перезагружена", "Ошибка при добавлении комментария<br>Проверьте заполненные поля и попробуйте ещё раз");
        return false;
    });
    $("#comment").on("click", ".comment-reply-info", function() {
        $(this).remove();
        $('#comment input[name="reply_id"]').val("");
        $("#comment").detach().appendTo($(".init-comment-form-here"));
    });
    $(".hide-re-tree").click(function() {
        $(this).parent().addClass("comments-collapsed");
    });
    $(".expand-re-tree").click(function() {
        $(this).parent().removeClass("comments-collapsed");
    });
    $("#user-comment-name").keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
    $("#user-comment-text").keydown(function(e) {
        checkCommentForAccLink($(this), false);
        if (e.ctrlKey && e.keyCode == 13) {
            $("#add-comment-btn").click();
        }
        if (!e.ctrlKey && e.keyCode == 13) {
            let currentRowsNum = parseInt($(this).attr('rows'));
            $(this).attr('rows', currentRowsNum + 1);
        }
    });
    $("#user-comment-text").on('paste', function() {
        checkCommentForAccLink($(this), true);
    });
});