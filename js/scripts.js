const _unescape = str =>
    str.replace(
      /&amp;|&lt;|&gt;|&#39;|&quot;/g,
      tag =>
        ({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&#39;': "'",
          '&quot;': '"'
        }[tag] || tag)
    );

$(document).ready(function() {
    //init items
    let locale = document.documentElement.lang;
    let tippyinst=[];
    let league_list=[];
	let i_lang='ru';
    let cookie_theme = $.cookie('theme') ? $.cookie('theme') : null;
    let expire_date = new Date();
	expire_date.setTime(expire_date.getTime() + (15* 365 * 24 * 60 * 60 * 1000));

    const themeSwitches = document.querySelectorAll('.theme-switch');
    
    if (cookie_theme != null) {
        if(cookie_theme == 'dark'){
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-default', 'theme-light');
            themeSwitches.forEach(function(switchElement) {
                switchElement.checked = true;
            });
        } else if (cookie_theme == 'light') {
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-default', 'theme-dark');
            themeSwitches.forEach(function(switchElement) {
                switchElement.checked = false;
            });
        }
    } else if (window.matchMedia) {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-default', 'theme-light');
            themeSwitches.forEach(function(switchElement) {
                switchElement.checked = true;
            });
            cookie_theme = 'dark';
            $.cookie('theme', cookie_theme, {expires: expire_date});
        } else {
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-default', 'theme-dark');
            themeSwitches.forEach(function(switchElement) {
                switchElement.checked = false;
            });
            cookie_theme = 'light';
            $.cookie('theme', cookie_theme, {expires: expire_date});
        }
    } else {
        document.body.classList.remove('theme-dark', 'theme-light');
    }

    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('theme-switch')) {
            const isChecked = e.target.checked;
            if (isChecked) {
                themeSwitches.forEach(function(switchElement) {
                    switchElement.checked = true;
                });
                document.body.classList.add('theme-dark');
                document.body.classList.remove('theme-default', 'theme-light');
                cookie_theme = 'dark';
                $.cookie('theme', cookie_theme, {expires: expire_date});
            } else {
                themeSwitches.forEach(function(switchElement) {
                    switchElement.checked = false;
                });
                document.body.classList.add('theme-light');
                document.body.classList.remove('theme-default', 'theme-dark');
                cookie_theme = 'light';
                $.cookie('theme', cookie_theme, {expires: expire_date});
            }
        }
    });

    // анимация меню
	$('.menu').click(function(e){
        e.preventDefault();
        $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

        $('html').addClass('with-fancybox');
        $('body').addClass('hide-scrollbar');
        $('.header-mob').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu, .aside-navigation-menu-button, .aside-navigation-menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header-mob, .menu').removeClass('active');
                $('html, body').removeClass('with-fancybox hide-scrollbar');
            }
        });
    });

    // анимация навигационного меню на странице билда
	$('.aside-navigation-menu-button').click(function(e){
        e.preventDefault();
        $(this).find('.aside-navigation-menu').hasClass('active') ? $(this).find('.aside-navigation-menu').removeClass('active') : $(this).find('.aside-navigation-menu').addClass('active');

        $('html').addClass('with-fancybox');
        $('body').addClass('hide-scrollbar');
        $('.aside-navigation').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.aside-navigation, .navigation-menu, .aside-navigation-menu, .aside-navigation-parameters');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.aside-navigation, .aside-navigation-menu').removeClass('active');
                $('html, body').removeClass('with-fancybox hide-scrollbar');
            }
        });
    });

    // выпадающие меню
    $('body').on('click', '.dropdown', function(){
        let $this = $(this);
        $('.dropdown').not($this).removeClass('active');
        $this.toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.dropdown, .dropdown-current');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.removeClass('active');
            }
        });
    });

    // уведомления
    $('body').on('click', '.notice-header-link', function(){
        let $this = $(this);
        $('.notice-header-block').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.notice-header-block, .notice-header-link');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.removeClass('active');
            }
        });
    });

    // кнопка раскрытия/сворачивания уведомлений
    $('body').on('click', '.notice-block-more', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('.notice-hidden').toggle();
    });

    // якоря для ссылок
    $('body').on('click', '.anchor[href^="#"]', function () {
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
        let existingImage = youtube[i].querySelector("img");
        if (!existingImage) {
            let source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/maxresdefault.jpg";
            let image = new Image();
            image.src = source;
            image.addEventListener("load", function() {
                youtube[i].appendChild(image);
            });
        }
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
        $('.anchor-block, .scrollspy').each(function() {
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
    let select_league;
    if($('.aside-navigation-parameter-select').length) {
        select_league = NiceSelect.bind(document.getElementById("select-league"), {});
    }

    // табы
    $('body').on('click','.tab-trigger', function(e){
        e.preventDefault();
        $(this).parent().find('.tab-trigger').removeClass('active');
        let tab = $(this).data('tab');
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
        defaultType: "inline", 
        dragToClose: false,
        touchMove: false,
        backdropClick: false
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

    // комментарии
    if ($('.section').data('article-id')) {
        //избранное
        $.ajax({
            url:    '/lk/get_comments_high/',
            type:   "GET",
            dataType: "html",
            data: {'article_id': parseInt($('.section').data('article-id'))},
            success: function(response) { 
                response = $.parseJSON(response);
                if (response.result == 'ok') {
                    $('.comments-high').html(response.data);
                }
                if (response.result == 'error') {
                    console.log('Ошибка получения комментариев');
                }
            },
            error: function(response) {
                console.log('Ошибка отправки');
            }
        });
        
        $.ajax({
            url:    '/lk/get_comments/',
            type:   "GET",
            dataType: "html",
            data: {'article_id': parseInt($('.section').data('article-id'))},
            success: function(response) { 
                response = $.parseJSON(response);
                if (response.result == 'ok') {
                    $('.comments-ajax').html(response.data);
                    $('#showmore-trigger').attr('data-page', response.page).attr('data-max', response.num_pages);
                    if ($('#showmore-trigger').attr('data-page') == $('#showmore-trigger').attr('data-max')) {
                        $('#showmore-trigger').children().hide();
                    }
                }
                if (response.result == 'error') {
                    console.log('Ошибка получения комментариев');
                }
            },
            error: function(response) {
                console.log('Ошибка отправки');
            }
        });
    }

    // подгрузка комментов при скролле
    let block_show = false;
    function scrollMore(){
        let $target = $('#showmore-trigger');
        
        if (block_show) {
            return false;
        }
    
        let wt = $(window).scrollTop();
        let wh = $(window).height();
        let et = $target.offset().top - 150;
        let eh = $target.outerHeight();
        let dh = $(document).height();   
    
        if (wt + wh >= et || wh + wt == dh || eh + et < wh){
            let page = $target.attr('data-page');
            let max = $target.attr('data-max');	
            if (page == max) {
                return false;
            }
            block_show = true;
    
            $.ajax({ 
                url: '/lk/get_comments/?page=' + page,
                type:   'GET',
                dataType: 'html',
                data: {'article_id': parseInt($('.section').data('article-id'))},
                success: function(response){
                    response = $.parseJSON(response);
                    if (response.result == 'ok') {
                        $('.comments-ajax').append(response.data);
                        $target.attr('data-page', response.page).attr('data-max', response.num_pages);
                    }
                    if (response.result == 'error') {
                        console.log('Ошибка получения комментариев');
                    }
                    
                    if (page == max) {
                        $target.children().hide();
                        block_show = true;
                    } else block_show = false;
                },
                error: function(response) {
                    console.log('Ошибка отправки');
                    block_show = false;
                }
            });
        }
    }
    $(window).scroll(function(){
        scrollMore();
    });

    scrollMore();

    $('body').on('click', '.comment-reply-btn', function() {
        let reply_id = $(this).attr('target');
        let article_id = $(this).attr('article');
        let comment_root = $(this).parent().parent();
        let reply_author = comment_root.find(".comment-author").text();
        let comment_reply_html = '<span class="comment-reply-info">Ответ на <i class="comment-reply-name-ref">' + reply_author + '</i><span class="close-comment-reply"></span></span>';
        $(".comment-reply-info").remove();
        $("#user_comment_form header").html(comment_reply_html);
        $('#comment input[name="reply_id"]').val(reply_id);
        $("#comment").detach().appendTo(comment_root);
    });
    $('body').on('click', '#add-comment-btn', function(e) {
        e.preventDefault();
        sendAjaxForm("user_comment_form", "/lk/comment/", true, "Комментарий добавлен<br>Страница будет перезагружена", "Ошибка при добавлении комментария<br>Проверьте заполненные поля и попробуйте ещё раз");
        return false;
    });
    $('body').on('click', '#comment .comment-reply-info', function() {
        $(this).remove();
        $('#comment input[name="reply_id"]').val("");
        $("#comment").detach().appendTo($(".init-comment-form-here"));
    });
    $('body').on('click', '.hide-re-tree', function() {
        $(this).parent().addClass("comments-collapsed");
    });
    $('body').on('click', '.expand-re-tree', function() {
        $(this).parent().removeClass("comments-collapsed");
    });
    $('body').on('keydown', '.expand-re-tree', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
    $('body').on('keydown', '#user-comment-text', function(e) {
        checkCommentForAccLink($(this), false);
        if (e.ctrlKey && e.keyCode == 13) {
            $("#add-comment-btn").click();
        }
        if (!e.ctrlKey && e.keyCode == 13) {
            let currentRowsNum = parseInt($(this).attr('rows'));
            $(this).attr('rows', currentRowsNum + 1);
        }
    });
    $('body').on('paste', '#user-comment-text', function() {
        checkCommentForAccLink($(this), true);
    });
    $('body').on('click', '.show-hidden-comment', function(){
        $(this).hide();
        $(this).parents('.comment-item').find('.comment-item-content').removeClass('hidden-comment');
    });
    $('body').on('click', '.comments-refresh-btn', function(e){
        e.preventDefault();
        $('div[data-comment-id="'+data.comment_id+'"] .comment-dynamic-hidden').addClass('comment-dynamic-new').removeClass('comment-dynamic-hidden');
        $(this).removeClass('scrolled');
    });

    // выпадающие меню в комментариях
    $('body').on('click', '.button-comment-more-info', function(){
        let $this = $(this);
        $('.comment-more-info').not($this).removeClass('active');
        $this.next().toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.button-comment-more-info, .comment-more-info');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.next().removeClass('active');
            }
        });
    });

    // открытие модалок
    $('body').on('click','.js-open-modal', function(e){
        e.preventDefault();
        let id = $(this).attr('href');
        Fancybox.show(
            [{src: id,}],
            {
                defaultType: "inline", 
                // dragToClose: false,
                // touchMove: false,
                // backdropClick: false
            }
        );        
    });

    //Генерация навигации (боковое меню) на странице статьи
	let navigationHtml = '';
	$('.section-build-page h2').each(function(){
		let $this = $(this);
		let title = $this.text();
		let anchor = $this.parent().attr('id');

		navigationHtml += '<a href="#' + anchor + '" class="navigation-menu-link anchor">' + title + '</a>';
	});
	// navigationHtml += "<li><a href='#comments-block'>Комментарии</a></li>"
	$(navigationHtml).appendTo(".navigation-menu-list");
	// Генерация навигации (боковое меню) на странице статьи END

    // The autoComplete.js Engine instance creator
    const search_form = document.querySelector('.search-header-block');
    const search_form_action = search_form.action ? search_form.action : '/poe/search/';
    const autoCompleteJS = new autoComplete({
        selector: '#autoComplete',
        placeHolder: "Поиск по сайту",
        wrapper: false,
        threshold: 3,
        debounce: 600,
        submit: true,
        data: {
            src: async () => {
                try {
                    // Fetch External Data Source
                    // const source = await fetch("./db/generic.json");
                    const source = await fetch(search_form_action+'?q='+autoCompleteJS.input.value+'&autocomplete=1');
                    const data = await source.json();
                    // Returns Fetched data
                    return data;
                } catch (error) {
                    return error;
                }
            },
            keys: ["target", "icon", "text", "tag", "color"],
            // cache: true,

        },
        resultsList: {
            class: "search-header-result",
            destination: "#autoComplete",
            // position: "afterend",
            maxResults: 5,
            noResults: true,
            element: (list, data) => {
                const info = document.createElement('p');
                info.classList.add('search-header-result-not-found');
                if (data.results.length == 0) {
                    info.innerHTML = `Поиск не дал результатов`;
                    list.prepend(info);
                } else {
                    if(document.querySelector('.search-header-result-not-found')) {
                        document.querySelector('.search-header-result-not-found').remove();
                    }
                }
            },
        },
        resultItem: {
            class: "search-header-result-item",
            highlight: true,
            selected: "autoComplete_selected",
            element: (item, data) => {
                let match_text = data.key == 'text' ? data.match : data.value.text;
                item.innerHTML = `
                    <a href="${data.value.target}" class="search-header-result-item-link">
                        <div class="search-header-result-item-icon">
                            <img src="${data.value.icon}">
                        </div>
                        <div class="search-header-result-item-text" style="color: ${data.value.color}">
                            ${match_text}
                        </div>
                        <div class="search-header-result-item-tag">
                            ${data.value.tag}
                        </div>
                    </a>
                `;
            },
        },
        events: {
            input: {
                focus() {
                    if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                },
            },
        },
    });
    
    $.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain && typeof csrftoken !== 'undefined') {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    // лайки/дизлайки
    $('body').on('click', '.js-like-click', function(){
        let $this = $(this);
        let form_data = $('[name="csrfmiddlewaretoken"], #id_captcha').serialize();
        let comment_data = '&comment_id=' + $(this).parents('.comment-item').data('id') + '&type=' + $(this).data('like');
        $.ajax({
            url:    '/lk/like/',
            type:   "POST",
            dataType: "html",
            data: form_data + comment_data,
            success: function(response) { 
                response = $.parseJSON(response);
                if (response.result == 'ok') {
                    // response.value == '+' + -
                    // response.type == 'l' l d cl
                    //console.log('лайк/дизлайк поставлен');
                    if(response.value == '+') {
                        if(response.type == 'l') {
                            $this.addClass('comment-like');
                            $this.parent().find('.js-like-click').removeClass('comment-dislike');
                        } else if (response.type == 'd') {
                            $this.addClass('comment-dislike');
                            $this.parent().find('.js-like-click').removeClass('comment-like');
                        }
                    } else if (response.value == '-') {
                        if(response.type == 'l') {
                            $this.parent().find('.js-like-click').removeClass('comment-like');
                        } else if (response.type == 'd') {
                            $this.parent().find('.js-like-click').removeClass('comment-dislike');
                        }
                    }
                }
                if (response.result == 'error') {
                    console.log('ошибка'); 
                }
            },
            error: function(response) {
                console.log('Ошибка отправки'); 
            }
        });
        return false; 
    });

    // reg
    $("#btn_reg").click(
		function(){
			sendAjaxForm(
				'reg_form', 
				'/lk/register/',
				false,
				"Вы успешно зарегистрированы",
				"Ошибка"
			);
			return false; 
		}
	);
    // reset password
    $("#btn_reset_pwd").click(
		function(){
			sendAjaxForm(
				'reset_password_form', 
				'/lk/reset_password/',
				false,
				"Пароль сброшен",
				"Ошибка"
			);
			return false; 
		}
	);
    //login-logout
	$("#btn_auth").click(
		function(){
			sendAjaxForm(
				'auth_form', 
				'/lk/auth/',
				true,
				"Вы успешно вошли в аккаунт",
				"Ошибка"
			);
			return false; 
		}
	);
	$("#btn_logout").click(
		function(){
			sendAjaxForm(
				'logout_form', 
				'/lk/logout/',
				true,
				"Вы вышли из аккаунта",
				"Ошибка"
			);
			return false; 
		}
	);

    //init lang
  	if(locale=='en'){
  		i_lang='en';
  	}
    i_lang=$.cookie('i_lang');
  	let i_league=$.cookie('i_league');
	let i_platform=$.cookie('i_platform');
    //cookie not set or ru
  	if(!i_lang){
        i_lang='ru';
    }
  	//set lang cookie
  	$.cookie('i_lang',i_lang,{ expires: expire_date});
  	//set ui
  	if(i_lang=='ru'){
        $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
  		$('.poe-lang-choose .ch-button-configuration[value="ru"]').prop('checked', true);
  		$('.en-poe').hide();
  		$('.ru-poe').show();
  	}
  	else{
        $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
  		$('.poe-lang-choose .ch-button-configuration[value="en"]').prop('checked', true);
  		$('.en-poe').show();
  		$('.ru-poe').hide();
  	}

    //Покраска предметов
    remakeItems();

  	// check poe
	if (typeof poe !== 'undefined' && poe) {
		$.ajax('/lk/poeleaguelist/')
		.done((response) => {
			$.when.apply($, response.map((value) => {
			    return $('select.poe-league-choose').append($('<option></option>').attr('value',value.slug).text(i_lang=='ru'?value.name:value.name_en)); 
			})).then(() => {
                // ???
				// $('.poe-platform-choose select').append($('<option></option>').attr('value','PC').text('ПК')); 
				// $('.poe-platform-choose select').append($('<option></option>').attr('value','XBOX').text('Xbox')); 
				// $('.poe-platform-choose select').append($('<option></option>').attr('value','SONY').text('PlayStation')); 

				league_list=response;
                
                // NiceSelect.bind(document.getElementById("select-league"), {});
                select_league.update();

				//init league
			    if(!i_league){
			    	if($('select.poe-league-choose')[0] && $('select.poe-league-choose')[0].options.length){
			    		i_league = $('select.poe-league-choose')[0].options[0].value;
			    	}
			    	else{
			    		i_league = i_lang=='ru'?'Стандарт':'Standard';
			    	}
			    }
			    else{
				    if(!$('select.poe-league-choose option[value="' + i_league + '"]').prop('selected', true).length){
				    	i_league = $('select.poe-league-choose')[0].options[0].value;
				    }
				    $('select.poe-league-choose').trigger('change');
                    select_league.update();
			    }
			    //set league cookie
			    $.cookie('i_league',i_league,{ expires: expire_date});

				//init platform
				if(!i_platform){
					if($('.poe-platform-choose .ch-button-configuration').length){
						i_platform = $('.poe-platform-choose .ch-button-configuration:checked').val();
					}
					else{
						i_platform = 'PC';
					}
				}
				else{
					if(!$('.poe-platform-choose .ch-button-configuration[value="' + i_platform + '"]').prop('checked', true).length){
						i_platform = $('.poe-platform-choose .ch-button-configuration:checked').val();
					}
				}
				//set platform cookie
				$.cookie('i_platform',i_platform,{ expires: expire_date});
			});
	    });

	// end check poe
	}

	// ПоЕ выбор языка игры и лиги для трейд-ссылок

	// lang select
	$('.poe-lang-choose .ch-button-configuration').change(function(){
		if ($(this).parent().find('.ch-button-configuration[value="ru"]').is(':checked')){
            $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
            $('.poe-lang-choose .ch-button-configuration[value="ru"]').prop('checked', true);
			i_lang='ru';
			$('.en-poe').hide();
			$('.ru-poe').show();
		} else {
            $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
			$('.poe-lang-choose .ch-button-configuration[value="en"]').prop('checked', true);	
			i_lang='en';
	  		$('.en-poe').show();
	  		$('.ru-poe').hide();
		}
		$.cookie('i_lang',i_lang,{ expires: expire_date});
		//remake select
		$.when.apply($, league_list.map((value) => {
		    return $('select.poe-league-choose option[value="' + value.slug + '"]').text(i_lang=='ru'?value.name:value.name_en); 
		}));
		// NiceSelect.update(document.getElementById("select-league"), {});
		$('select.poe-league-choose').trigger('change');
        select_league.update();

		remakeItems();
	});

	// league select
	$('select.poe-league-choose').change(function(){
		select_league.update();
		i_league = $('select.poe-league-choose option:selected').val();
		$.cookie('i_league',i_league,{ expires: expire_date});
	});
	// platform select
	$(".poe-platform-choose .ch-button-configuration").change(function(){
		i_platform = $(this).val();
		$.cookie('i_platform',i_platform,{ expires: expire_date});
	});

	$('.item_poetrade').click((e) => {
		if (!i_league)i_league = 'Standard';
		if (!i_platform)i_platform = 'PC';
		let platform_url = '';
		if(i_platform!='PC'){
			platform_url = i_platform.toLowerCase() + '/';
		}

		let isBulk = $(e.target).attr('data-bulk'),
			linkType = ''; // if bulk = exchange, else = search

		if (isBulk == 'true'){
			linkType = 'exchange';
		} else {
			linkType = 'search';
		}

		if(i_lang=='ru'){
			window.open("https://ru.pathofexile.com/trade/" + linkType + "/" + platform_url + i_league + "/" + $(e.target).attr('data-target_ru'), '_blank');
		} else{
			window.open("https://www.pathofexile.com/trade/" + linkType + "/" + platform_url + i_league + "/" + $(e.target).attr('data-target_en'), '_blank');
		}
	});



    function remakeItems(){
        //item colors and names
        $('poeitem').each( (e,el)=> { 
            $(el).find('img').remove();
            let color = $(el).attr('data-color');
            if(color){
                $(el).css('color', color);
            }
            let name_ru = $(el).attr('data-name_ru');
            if(i_lang=='ru' && name_ru){
                $(el).text(name_ru);
            }
            let name_en = $(el).attr('data-name_en');
            if(i_lang=='en' && name_en){
                $(el).text(name_en);
            }
            let image = $(el).attr('data-image');
            if(image){
                $(el).prepend('<img class="item-image" src="'+image+'" />')
            }
        });
        //remove old
        for (let i=0; i<tippyinst.length; i++) {
            tippyinst[i].destroy();
        }
        //add tooltips
        let tippy_placement = 'right';
        if(window.innerWidth < 481) {
            tippy_placement = 'top';
        }
        tippyinst = tippy('poeitem', {
            content: '...',
            onCreate(instance) {
                // Setup our own custom state properties
                instance._isFetching = false;
                instance._error = null;
            },
            onShow(instance) {
                if (instance._isFetching ||  instance._error) {
                    return;
                }
            
                instance._isFetching = true;
                let target = instance.reference.getAttribute('data-target');
                fetch('/lk/item/?item='+target+'&lang='+i_lang)
                    .then((response) => response.json())
                    .then((blob) => {
                        instance.setContent(_unescape(blob.data));
                    })
                    .catch((error) => {
                        // Fallback if the network request failed
                        instance._error = error;
                        instance.setContent(`Request failed. ${error}`);
                    })
                    .finally(() => {
                        instance._isFetching = false;
                    });
            },
            onHidden(instance) {
                //instance.setContent('...');
                // Unset these properties so new network requests can be initiated
                instance._error = null;
                instance._isFetching = true;
            },
            followCursor: true,
            allowHTML: true,
            placement: tippy_placement,
        });
    }
});


//ajax form
function sendAjaxForm(ajax_form, url, reload=false, successText, errorText) {
    $.ajax({
        url:    url,
        type:   "POST",
        dataType: "html",
        data: $("#" + ajax_form).serialize(), 
        success: function(response, status, xhr) { 
			response = $.parseJSON(response);
			if (response.result == 'ok') {

				// alert(successText);

				if (reload){
					// infoModal('Готово', 'Данные успешно отправлены.');
					// $('#infomodal .modal-close').click(function(){
					// 	document.location.reload(true);
					// });

					// setTimeout(function() {
					// 	document.location.reload(true);
					// }, 5000);
				}
			}
        	if (response.result == 'error') {
				// infoModal('Ошибка', 'Данные не верны.');
				// console.log('Ошибка. Данные не верны.');

				// alert(errorText);
                alert(response.text);
			}
            if (xhr.status != 200) {
                alert(response.text);
			}
    	},
    	error: function() {
			// infoModal('Ошибка', 'Данные не отправлены.');
			// console.log('Ошибка. Данные не отправлены.');

			// alert(errorText);
    	}
 	});
}

// Element - textarea input
// Delay (bool) - we need delay if we Paste link, because Paste not changing input.val instantly
function checkCommentForAccLink(element, delay){
	let delayTime;

	if (delay){
		delayTime = 1000;
	} else {
		delayTime = 0;
	}
				
	setTimeout(function() {
		let commentText = element.val();
		let warnElem = $('.poe-paste-profile-warn');
		let regExp = /(http(s)?):\/\/(www\.)?(ru\.)?(pathofexile\.com){1}(\/account)/;

		if (commentText.search(regExp) >= 0){
			warnElem.removeClass("hide");
		} else {
			warnElem.addClass("hide");
		}
	}, delayTime);
}