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
	let color_list=[];
	let name_list_ru=[];
	let name_list_en=[];
	let type_list=[];
	let image_list=[];
	let i_lang=null;
    let expire_date = new Date();
	expire_date.setTime(expire_date.getTime() + (15* 365 * 24 * 60 * 60 * 1000));

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
        $('.dropdown').not($this).removeClass('active');
        $this.toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.dropdown, .dropdown-current');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.removeClass('active');
            }
        });
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
        NiceSelect.bind(document.getElementById("select-league"), {});
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
            let div = $('.expert-page-medal');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $this.siblings('.expert-page-medal-tooltip').removeClass('active');
            }
        });
    });

    // комментарии
    if ($('.section').data('article-id')) {
        $.ajax({
            url:    '/lk/get_comments/',
            type:   "GET",
            dataType: "html",
            data: {'article_id': parseInt($('.section').data('article-id'))},
            success: function(response) { 
                response = $.parseJSON(response);
                if (response.result == 'ok') {
                    $('.comments-ajax').html(response.data);
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
        Fancybox.show({
            src: id,
            type: 'inline'
        });
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
        let form_data = $('[name="csrfmiddlewaretoken"], #id_captcha').serialize();
        let comment_data = '&comment_id=' + $(this).parents('.comment-item').data('id') + '&type=' + $(this).data('like');
        let comment_likes = $(this).siblings('.comment-likes-count');
        let comment_likes_count = parseInt(comment_likes.text());
        let result_likes = 0;
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
                    console.log('лайк/дизлайк поставлен');
                    if(response.value == '+') {
                        if(response.type == 'l') {
                            result_likes = comment_likes_count+1;
                        } else if (response.type == 'd') {
                            result_likes = comment_likes_count-1;
                        }
                    } else if (response.value == '-') {
                        if(response.type == 'l') {
                            result_likes = comment_likes_count-1;
                        } else if (response.type == 'd') {
                            result_likes = comment_likes_count+1;
                        }
                    }
                    if (result_likes > 0) {
                        result_likes = '+' + result_likes.toString();
                    }
                    comment_likes.text(result_likes);
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
  	i_lang=$.cookie('i_lang');
  	let i_league=$.cookie('i_league');
	let i_platform=$.cookie('i_platform');
  	if(locale=='en'){
  		i_lang='en';
  	}
  	//cookie not set or ru
  	if(!i_lang){
  		i_lang='ru';
  	}
  	//set lang cookie
  	$.cookie('i_lang',i_lang,{ expires: expire_date});
  	//set ui
  	if(i_lang!='ru'){
        $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
  		$('.poe-lang-choose .ch-button-configuration[value="ru"]').prop('checked', true);
  		$('.en-poe').show();
  		$('.ru-poe').hide();
  	}
  	else{
        $('.poe-lang-choose .ch-button-configuration').prop('checked', false);
  		$('.poe-lang-choose .ch-button-configuration[value="en"]').prop('checked', true);
  		$('.en-poe').hide();
  		$('.ru-poe').show();
  	}

  	// check poe
	if (typeof poe !== 'undefined' && poe) {
		let league_list=[];
		$.ajax('/lk/poeleaguelist/')
		.done((response) => {
			$.when.apply($, response.map((value) => {
			    return $('select.poe-league-choose').append($('<option></option>').attr('value',value.slug).text(i_lang=='ru'?value.name:value.name_en)); 
			})).then(() => {
                // ???
				$('.poe-platform-choose select').append($('<option></option>').attr('value','PC').text('ПК')); 
				$('.poe-platform-choose select').append($('<option></option>').attr('value','XBOX').text('Xbox')); 
				$('.poe-platform-choose select').append($('<option></option>').attr('value','SONY').text('PlayStation')); 

				league_list=response;
				//from ivanjs
                NiceSelect.bind(document.getElementById("select-league"), {});

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
				    $('.poe-league-chosen').text($('select.poe-league-choose option:selected').text());
			    }
			    //set league cookie
			    $.cookie('i_league',i_league,{ expires: expire_date});

				//init platform
				if(!i_platform){
					if($('.poe-platform-choose select')[0] && $('.poe-platform-choose select')[0].options.length){
						i_platform = $('.poe-platform-choose select')[0].options[0].value;
					}
					else{
						i_platform = 'PC';
					}
				}
				else{
					if(!$('.poe-platform-choose select option[value="' + i_platform + '"]').prop('selected', true).length){
						i_platform = $('.poe-platform-choose select')[0].options[0].value;
					}
					$('.poe-platform-chosen').text($('.poe-platform-choose select option:selected').text());
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
		//remake tooltips
		$('.item_lk').each( (i,e) => {
			let tip = M.Tooltip.getInstance($(e));
			if(tip){
				tip.destroy();
			}
		});
		//remake select
		$.when.apply($, league_list.map((value) => {
		    return $('select.poe-league-choose option[value="' + value.slug + '"]').text(i_lang=='ru'?value.name:value.name_en); 
		}));
		NiceSelect.bind(document.getElementById("select-league"), {});
		$('.poe-league-chosen').text($('select.poe-league-choose option:selected').text());

		remakeItems();
	});

	// league select
	$('select.poe-league-choose').change(function(){
		let laegueName =  $('select.poe-league-choose option:selected').text();
		$('.poe-league-chosen').text(laegueName);
		i_league = $('select.poe-league-choose option:selected').val();
		$.cookie('i_league',i_league,{ expires: expire_date});
	});
	// platform select
	$(".poe-platform-choose select").change(function(){
		let platformName =  $(".poe-platform-choose select option:selected").text();
		$(".poe-platform-chosen").text(platformName);
		i_platform = $(".poe-platform-choose select option:selected").val();
		$.cookie('i_platform',i_platform,{ expires: expire_date});
	});

    //tooltips
    let tippy_placement = 'right';
    if(window.innerWidth < 481) {
        tippy_placement = 'top';
    }
    tippy('poeitem', {
        content: '...',
        onCreate(instance) {
            // Setup our own custom state properties
            instance._isFetching = false;
            instance._error = null;
            
            console.log('create');
        },
        onShow(instance) {
            console.log('show')
            if (instance._isFetching ||  instance._error) {
                console.log('return')
                return;
            }
        
            instance._isFetching = true;
            let target = instance.reference.getAttribute('data-target');
            console.log(target);
            fetch('/lk/item/?item='+target+'&lang='+i_lang)
                .then((response) => response.json())
                .then((blob) => {
                    instance.setContent(_unescape(blob.data));
                    console.log(_unescape(blob.data));
                })
                .catch((error) => {
                    // Fallback if the network request failed
                    instance._error = error;
                    instance.setContent(`Request failed. ${error}`);
                })
                .finally(() => {
                    instance._isFetching = false;
                });
                console.log('fetch')
        },
        onHidden(instance) {
            //instance.setContent('...');
            // Unset these properties so new network requests can be initiated
            instance._error = null;
            instance._isFetching = true;
            console.log('hide')
        },
        followCursor: true,
        allowHTML: true,
        placement: tippy_placement,
    });


    // let elems = document.querySelectorAll('.poe-items');
    // $(elems).each( (e,el)=> { if(M.Tooltip.getInstance($(el)))M.Tooltip.getInstance($(el)).close() })
    // let item = $(e.target);
    // let target = $(this).attr('data-target');
    // let check_tooptip = M.Tooltip.getInstance($(item));
    // if(check_tooptip){
    // 	check_tooptip.open();
    // } else{
    // 	$.ajax('/lk/item/'+target+'&lang='+i_lang,{
    // 		beforeSend: () => {
    // 	        $(item).tooltip({
    // 				html: '. . .',
    // 				position: 'right'
    // 			});
    // 			let instance = M.Tooltip.getInstance($(item));
    // 			instance.open();
    // 		}
    // 	})
    // 	.always((content) => {
    //         $(item).tooltip({
    // 			html: htmlDecode(content),
    // 			position: 'right'
    // 		});
    // 		let instance = M.Tooltip.getInstance($(item));
    // 		if ($(item).is(":hover")){
    // 			instance.open();
    // 		}
    //     });
    // }

	// $('.poe-items').mouseout(function(e){
	// 	let elems = document.querySelectorAll('.poe-items');
	// 	$(elems).each( (e,el)=> { if(M.Tooltip.getInstance($(el)))M.Tooltip.getInstance($(el)).close() })
	// });
});

//ajax form
function sendAjaxForm(ajax_form, url, reload=false, successText, errorText) {
    $.ajax({
        url:    url,
        type:   "POST",
        dataType: "html",
        data: $("#" + ajax_form).serialize(), 
        success: function(response) { 
			response = $.parseJSON(response);
			if (response.result == 'ok') {

				alert(successText);

				if (reload){
					// infoModal('Готово', 'Данные успешно отправлены.');
					// $('#infomodal .modal-close').click(function(){
					// 	document.location.reload(true);
					// });

					setTimeout(function() {
						document.location.reload(true);
					}, 5000);
				}
			}
        	if (response.result == 'error') {
				// infoModal('Ошибка', 'Данные не верны.');
				// console.log('Ошибка. Данные не верны.');

				alert(errorText);
                alert(response.text);
			}
            if (response.code != 200) {
                alert(response.text);
			}
    	},
    	error: function(response) {
			// infoModal('Ошибка', 'Данные не отправлены.');
			// console.log('Ошибка. Данные не отправлены.');

			alert(errorText);
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