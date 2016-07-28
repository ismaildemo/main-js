 var KSOLUT = KSOLUT || {};

(function($) {
    "use strict";



    KSOLUT.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (KSOLUT.isMobile.Android() || KSOLUT.isMobile.BlackBerry() || KSOLUT.isMobile.iOS() || KSOLUT.isMobile.Opera() || KSOLUT.isMobile.Windows());
        }
    };

    KSOLUT.isRTL = {
        check: function() {
            if( $( "html" ).attr("dir") == "rtl" ) {
                return true;
            } else {
                return false;
            }
        }
    };

    KSOLUT.urlParameter = {
        get: function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }
    };


    KSOLUT.bmiCalculator = {
        magic: function(bmi) {
            var output = '';
            var info = '';
            if (bmi) {
                if (bmi < 15) {
                    info = "very severely underweight";
                }
                if ((bmi >= 15)&&(bmi < 16)) {
                    info = "severely underweight";
                }
                if ((bmi >= 16)&&(bmi < 18.5)) {
                    info = "underweight";
                }
                if ((bmi >= 18.5)&&(bmi < 25)) {
                    info = "normal";
                }
                if ((bmi >= 25)&&(bmi < 30)) {
                    info = "overweight";
                }
                if ((bmi >= 30)&&(bmi < 35)) {
                    info = "moderately obese";
                }
                if ((bmi >= 35)&&(bmi <= 40)) {
                    info = "severely obese";
                }
                if (bmi >40) {
                    info = "very severely obese";
                }
                output = "Your BMI is <span>"  + bmi + "</span><br />" + 
                                                              "You are <span>"  + info + "</span>.";
            } else {
                output = "You broke it!";
            };
            return output;
        },
        
        calculateStandard: function (bmi_form) {
            var weight_lbs = bmi_form.find('input[name="bmi_standard_weight_lbs"]').val();
            var height_ft = bmi_form.find('input[name="bmi_standard_height_ft"]').val();
            var height_in = bmi_form.find('input[name="bmi_standard_height_in"]').val();
            var age = bmi_form.find('input[name="bmi_standard_age"]').val();
            var gender = bmi_form.find('radio[name="bmi_standard_gender"]').val();

            var total_height_inc = ( parseInt(height_ft) * 12 ) + parseInt(height_in);
            var bmi = ( parseFloat(weight_lbs) / (total_height_inc * total_height_inc) ) * 703;
            var output = KSOLUT.bmiCalculator.magic(bmi);

            bmi_form.find('#bmi_standard_calculator_form_result').html(output).fadeIn('slow');
        },
        
        calculateMetric: function (bmi_form) {
            var weight_kg = bmi_form.find('input[name="bmi_metric_weight_kg"]').val();
            var height_cm = bmi_form.find('input[name="bmi_metric_height_cm"]').val();
            var age = bmi_form.find('input[name="bmi_standard_age"]').val();
            var gender = bmi_form.find('radio[name="bmi_standard_gender"]').val();

            var total_weight_kg = parseFloat(weight_kg) ;
            var total_height_m = parseFloat(height_cm) * 0.01;
            var bmi = ( total_weight_kg / (total_height_m * total_height_m) );
            var output = KSOLUT.bmiCalculator.magic(bmi);

            bmi_form.find('#bmi_metric_calculator_form_result').html(output).fadeIn('slow');
        },
        
        init: function () {
            var bmi_Standard_Form = $('#form_bmi_standard_calculator');
            bmi_Standard_Form.on('submit', function(e) {
                e.preventDefault();
                KSOLUT.bmiCalculator.calculateStandard(bmi_Standard_Form);
                return false;
            });

            var bmi_Metric_Form = $('#form_bmi_metric_calculator');
            bmi_Metric_Form.on('submit', function(e) {
                e.preventDefault();
                KSOLUT.bmiCalculator.calculateMetric(bmi_Metric_Form);
                return false;
            });
        }

    };

    KSOLUT.initialize = {

        init: function() {
            KSOLUT.bmiCalculator.init();
            KSOLUT.initialize.KS_datePicker();
            KSOLUT.initialize.KS_onLoadModal();
            KSOLUT.initialize.KS_loadBSParentModal();
            KSOLUT.initialize.KS_demoSwitcher();
            KSOLUT.initialize.KS_platformDetect();
            KSOLUT.initialize.KS_customDataAttributes();
            KSOLUT.initialize.KS_parallaxBgInit();
            KSOLUT.initialize.KS_resizeFullscreen();
            KSOLUT.initialize.KS_prettyPhoto_lightbox();
            KSOLUT.initialize.KS_nivolightbox();
            KSOLUT.initialize.KS_fitVids();
            KSOLUT.initialize.KS_YTPlayer();
            KSOLUT.initialize.KS_equalHeightDivs();
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_datePicker: function() {
            $( ".date-picker" ).datepicker();
            $( ".time-picker" ).timepicker();
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_onLoadModal: function() {
            var $modal = $('.modal-on-load');
            if( $modal.length > 0 ) {
                $modal.each( function(){
                    var element             = $(this),
                        elementTarget       = element.attr('data-target'),
                        elementTargetValue  = elementTarget.split('#')[1],
                        elementDelay        = element.attr('data-delay'),
                        elementTimeout      = element.attr('data-timeout'),
                        elementAnimateIn    = element.attr('data-animate-in'),
                        elementAnimateOut   = element.attr('data-animate-out');

                    if( !element.hasClass('enable-cookie') ) { $.removeCookie( elementTargetValue ); }

                    if( element.hasClass('enable-cookie') ) {
                        var elementCookie = $.cookie( elementTargetValue );

                        if( typeof elementCookie !== 'undefined' && elementCookie == '0' ) {
                            return true;
                        }
                    }

                    if( !elementDelay ) {
                        elementDelay = 1500;
                    } else {
                        elementDelay = Number(elementDelay) + 1500;
                    }

                    var t = setTimeout(function() {
                        $.magnificPopup.open({
                            items: { src: elementTarget },
                            type: 'inline',
                            mainClass: 'mfp-no-margins mfp-fade',
                            closeBtnInside: false,
                            fixedContentPos: true,
                            removalDelay: 500,
                            callbacks: {
                                open: function(){
                                    if( elementAnimateIn !== '' ) {
                                        $(elementTarget).addClass( elementAnimateIn + ' animated' );
                                    }
                                },
                                beforeClose: function(){
                                    if( elementAnimateOut !== '' ) {
                                        $(elementTarget).removeClass( elementAnimateIn ).addClass( elementAnimateOut );
                                    }
                                },
                                afterClose: function() {
                                    if( elementAnimateIn !== '' || elementAnimateOut !== '' ) {
                                        $(elementTarget).removeClass( elementAnimateIn + ' ' + elementAnimateOut + ' animated' );
                                    }
                                    if( element.hasClass('enable-cookie') ) {
                                        $.cookie( elementTargetValue, '0' );
                                    }
                                }
                            }
                        }, 0);
                    }, Number(elementDelay) );

                    if( elementTimeout !== '' ) {
                        var to = setTimeout(function() {
                            $.magnificPopup.close();
                        }, Number(elementDelay) + Number(elementTimeout) );
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Bootstrap Parent Modal  --------------------- */
        /* ---------------------------------------------------------------------- */
        KS_loadBSParentModal: function() {
            var ajaxLoadContent = true;
            if( ajaxLoadContent ) {
                $.ajax({
                    url: "ajax-load/bootstrap-parent-modal.html",
                    success: function (data) { $('body').append(data); },
                    dataType: 'html'
                });
            }
        },
        /* ---------------------------------------------------------------------- */
        /* ------------------------------ demo switcher    ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_demoSwitcher: function() {
            var showSwitcher = true;
            var $style_switcher = $('#style-switcher');
            if( !$style_switcher.length && showSwitcher ) {
                $.ajax({
                    url: "color-switcher/style-switcher.html",
                    success: function (data) { $('body').append(data); },
                    dataType: 'html'
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ preloader  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_preLoaderClickDisable: function() {
            var $preloader = $('#preloader');
            $preloader.children('#disable-preloader').on('click', function(e) {
                $preloader.fadeOut();
                return false;
            });
        },

        KS_preLoaderOnLoad: function() {
            var $preloader = $('#preloader');
            $preloader.delay(200).fadeOut('slow');
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Platform detect  --------------------- */
        /* ---------------------------------------------------------------------- */
        KS_platformDetect: function() {
            if (KSOLUT.isMobile.any()) {
                $html.addClass("mobile");
            } else {
                $html.addClass("no-mobile");
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_hashForwarding: function() {
            if (window.location.hash) {
                var hash_offset = $(window.location.hash).offset().top;
                $("html, body").animate({
                    scrollTop: hash_offset
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------- Background image, color ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_customDataAttributes: function() {
            $('[data-bg-color]').each(function() {
                $(this).css("cssText", "background: " + $(this).data("bg-color") + " !important;");
            });
            $('[data-bg-img]').each(function() {
                $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
            });
            $('[data-text-color]').each(function() {
                $(this).css('color', $(this).data("text-color"));
            });
            $('[data-font-size]').each(function() {
                $(this).css('font-size', $(this).data("font-size"));
            });
            $('[data-height]').each(function() {
                $(this).css('height', $(this).data("height"));
            });
            $('[data-border]').each(function() {
                $(this).css('border', $(this).data("border"));
            });
            $('[data-margin-top]').each(function() {
                $(this).css('margin-top', $(this).data("margin-top"));
            });
            $('[data-margin-right]').each(function() {
                $(this).css('margin-right', $(this).data("margin-right"));
            });
            $('[data-margin-bottom]').each(function() {
                $(this).css('margin-bottom', $(this).data("margin-bottom"));
            });
            $('[data-margin-left]').each(function() {
                $(this).css('margin-left', $(this).data("margin-left"));
            });
        },



        /* ---------------------------------------------------------------------- */
        /* -------------------------- Background Parallax ----------------------- */
        /* ---------------------------------------------------------------------- */
        KS_parallaxBgInit: function() {
            if (!KSOLUT.isMobile.any() && $(window).width() >= 800 ) {
                $('.parallax').each(function() {
                    var data_parallax_ratio = ( $(this).data("parallax-ratio") === undefined ) ? '0.5': $(this).data("parallax-ratio");
                    $(this).parallax("50%", 0.5);
                });
            } else {
                $('.parallax').addClass("mobile-parallax");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Home Resize Fullscreen ------------------- */
        /* ---------------------------------------------------------------------- */
        KS_resizeFullscreen: function() {
            var windowHeight = $window.height();
            $('.fullscreen, .revslider-fullscreen').height(windowHeight);
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Magnific Popup ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_magnificPopup_lightbox: function() {
            
            $('.image-popup-lightbox').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
                image: {
                    verticalFit: true
                }
            });

            $('.image-popup-vertical-fit').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-img-mobile',
                image: {
                    verticalFit: true
                }
            });

            $('.image-popup-fit-width').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                image: {
                    verticalFit: false
                }
            });

            $('.image-popup-no-margins').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true,
                    duration: 300 // don't foget to change the duration also in CSS
                }
            });

            $('.popup-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                    }
                }
            });

            $('.zoom-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                    titleSrc: function(item) {
                        return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                    }
                },
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function(element) {
                        return element.find('img');
                    }
                }
                
            });
            
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,

                fixedContentPos: false
            });

            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            });

            $('.popup-with-move-anim').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });

            $('.form-ajax-load').magnificPopup({
              type: 'ajax'
            });

            var $ajaxMagnificLightbox = $('[data-lightbox="ajax"]');
            if( $ajaxMagnificLightbox.length > 0 ) {
                $ajaxMagnificLightbox.magnificPopup({
                    type: 'ajax',
                    closeBtnInside: false,
                    callbacks: {
                        ajaxContentAdded: function(mfpResponse) {
                        },
                        open: function() {
                        },
                        close: function() {
                        }
                    }
                });
            }
            
            $('.popup-with-form').magnificPopup({
                type: 'inline',
                preloader: false,
                focus: '#name',

                mainClass: 'mfp-no-margins mfp-fade',
                closeBtnInside: false,
                fixedContentPos: true,

                // When elemened is focused, some mobile browsers in some cases zoom in
                // It looks not nice, so we disable it:
                callbacks: {
                  beforeOpen: function() {
                    if($(window).width() < 700) {
                      this.st.focus = false;
                    } else {
                      this.st.focus = '#name';
                    }
                  }
                }
            });

            /*================================
                portfolio magnificPopup
              ================================*/
            var $lightboxImage = $('[data-lightbox="image"]'),
                $lightboxGallery = $('[data-lightbox="gallery"]'),
                $lightboxIframe = $('[data-lightbox="iframe"]'),
                $lightboxInline = $('[data-lightbox="inline"]');

            //lightbox image
            if( $lightboxImage.length > 0 ) {
                $lightboxImage.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    image: {
                        verticalFit: true
                    }
                });
            }

            //lightbox gallery
            if( $lightboxGallery.length > 0 ) {
                $lightboxGallery.each(function() {
                    var element = $(this);
                    element.magnificPopup({
                        delegate: 'a[data-lightbox="gallery-item"]',
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        fixedContentPos: true,
                        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                        },
                        zoom: {
                          enabled: true,
                          duration: 300, // don't foget to change the duration also in CSS
                          opener: function(element) {
                            return element.find('img');
                          }
                        }

                    });
                });
            }

            //lightbox iframe
            if( $lightboxIframe.length > 0 ) {
                $lightboxIframe.magnificPopup({
                    disableOn: 600,
                    type: 'iframe',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            //lightbox inline
            if( $lightboxInline.length > 0 ) {
                $lightboxInline.magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-no-margins mfp-zoom-in',
                    closeBtnInside: false,
                    fixedContentPos: true
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- lightbox popup ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_prettyPhoto_lightbox: function() {
            //prettyPhoto lightbox
            $("a[data-rel^='prettyPhoto']").prettyPhoto({
                hook: 'data-rel',
                animation_speed:'normal',
                theme:'light_square',
                slideshow:3000, 
                autoplay_slideshow: false,
                social_tools: false
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Nivo Lightbox ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_nivolightbox: function() {
            $('a[data-lightbox-gallery]').nivoLightbox({
                effect: 'fadeScale'
            });
        },



        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Wow initialize  ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_wow: function() {
            var wow = new WOW({
                mobile: false // trigger animations on mobile devices (default is true)
            });
            wow.init();
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Fit Vids ------------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_fitVids: function() {
            $body.fitVids();
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- YT Player for Video -------------------- */
        /* ---------------------------------------------------------------------- */
        KS_YTPlayer: function() {
            $(".player").mb_YTPlayer();
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- equalHeights ---------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_equalHeightDivs: function() {
            /* equal heigh */
            var $equal_height = $('.equal-height');
            $equal_height.children('div').css('min-height', 'auto');
            $equal_height.equalHeights();

            /* equal heigh inner div */
            var $equal_height_inner = $('.equal-height-inner');
            $equal_height_inner.children('div').css('min-height', 'auto');
            $equal_height_inner.children('div').children('div').css('min-height', 'auto');
            $equal_height_inner.equalHeights();
            $equal_height_inner.children('div').each(function() {
                $(this).children('div').css('min-height', $(this).css('min-height'));
            });

            /* pricing-table equal heigh*/
            var $equal_height_pricing_table = $('.equal-height-pricing-table');
            $equal_height_pricing_table.children('div').css('min-height', 'auto');
            $equal_height_pricing_table.children('div').children('div').css('min-height', 'auto');
            $equal_height_pricing_table.equalHeights();
            $equal_height_pricing_table.children('div').each(function() {
                $(this).children('div').css('min-height', $(this).css('min-height'));
            });
        }

    };


    KSOLUT.header = {

        init: function() {

            var t = setTimeout(function() {
                KSOLUT.header.KS_fullscreenMenu();
                KSOLUT.header.KS_sidePanelReveal();
                KSOLUT.header.KS_scroolToTopOnClick();
                KSOLUT.header.KS_scrollToFixed();
                KSOLUT.header.KS_topnavAnimate();
                KSOLUT.header.KS_scrolltoTarget();
                KSOLUT.header.KS_menuzord();
                KSOLUT.header.KS_navLocalScorll();
                KSOLUT.header.KS_menuCollapseOnClick();
                KSOLUT.header.KS_homeParallaxFadeEffect();
                KSOLUT.header.KS_topsearch_toggle();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- menufullpage ---------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_fullscreenMenu: function() {
            var $menufullpage = $('.menu-full-page .fullpage-nav-toggle');
            $menufullpage.menufullpage();
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------- Side Push Panel ---------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_sidePanelReveal: function() {
            $(".side-panel-trigger").click(function(){
                $body.toggleClass("side-panel-open");
                if( $body.hasClass('device-touch') ) {
                    $body.toggleClass("ohidden");
                }
                return false;
            });

            $(".has-side-panel .body-overlay").click(function(){
                $body.toggleClass("side-panel-open");
                return false;
            });

            //sitebar tree
            $('.side-panel-nav .nav .tree-toggler').click(function () {
                $(this).parent().children('ul.tree').toggle(300);
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- scrollToTop  ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_scroolToTop: function() {
            if ($window.scrollTop() > 600) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        },

        KS_scroolToTopOnClick: function() {
            $(document.body).on('click', '.scrollToTop', function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        },


        /* ---------------------------------------------------------------------------- */
        /* --------------------------- One Page Nav close on click -------------------- */
        /* ---------------------------------------------------------------------------- */
        KS_menuCollapseOnClick: function() {
            $(document).on('click', '.onepage-nav a', function(e) {
                $('.showhide').trigger('click');
                return false;
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------- Active Menu Item on Reaching Different Sections ---------- */
        /* ---------------------------------------------------------------------- */
        KS_activateMenuItemOnReach: function() {
            var $onepage_nav = $('.onepage-nav');
            var cur_pos = $window.scrollTop() + 2;
            var nav_height = $onepage_nav.outerHeight();
            $sections.each(function() {
                var top = $(this).offset().top - nav_height - 80,
                    bottom = top + $(this).outerHeight();

                if (cur_pos >= top && cur_pos <= bottom) {
                    $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
                    $sections.removeClass('current').removeClass('active');

                    //$(this).addClass('current').addClass('active');
                    $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
                }
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- on click scrool to target with smoothness -------- */
        /* ---------------------------------------------------------------------- */
        KS_scrolltoTarget: function() {
            //jQuery for page scrolling feature - requires jQuery Easing plugin
            $('.smooth-scroll-to-target, .fullscreen-onepage-nav a').on('click', function(e) {
                e.preventDefault();

                var $anchor = $(this);
                
                var $hearder_top = $('.header .header-nav');
                var hearder_top_offset = 0;
                if ($hearder_top[0]){
                    hearder_top_offset = $hearder_top.outerHeight(true);
                } else {
                    hearder_top_offset = 0;
                }

                //for vertical nav, offset 0
                if ($body.hasClass("vertical-nav")){
                    hearder_top_offset = 0;
                }

                var top = $($anchor.attr('href')).offset().top - hearder_top_offset;
                $('html, body').stop().animate({
                    scrollTop: top
                }, 1500, 'easeInOutExpo');

            });
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Scroll navigation ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_navLocalScorll: function() {
            var data_offset = -60;
            $("#menuzord .menuzord-menu, #menuzord-right .menuzord-menu").localScroll({
                target: "body",
                duration: 800,
                offset: data_offset,
                easing: "easeInOutExpo"
            });

            $("#menuzord-side-panel .menuzord-menu, #menuzord-verticalnav .menuzord-menu, #fullpage-nav").localScroll({
                target: "body",
                duration: 800,
                offset: 0,
                easing: "easeInOutExpo"
            });
        },

        /* ---------------------------------------------------------------------------- */
        /* --------------------------- collapsed menu close on click ------------------ */
        /* ---------------------------------------------------------------------------- */
        KS_scrollToFixed: function() {
            $('.navbar-scrolltofixed').scrollToFixed();
            $('.scrolltofixed').scrollToFixed({
                marginTop: $('.header .header-nav').outerHeight(true) + 10,
                limit: function() {
                    var limit = $('#footer').offset().top - $(this).outerHeight(true);
                    console.log(limit);
                    return limit;
                }
            });
            $('#sidebar').scrollToFixed({
                marginTop: $('.header .header-nav').outerHeight() + 20,
                limit: function() {
                    var limit = $('#footer').offset().top - $('#sidebar').outerHeight() - 20;
                    return limit;
                }
            });
        },

        /* ----------------------------------------------------------------------------- */
        /* --------------------------- Menuzord - Responsive Megamenu ------------------ */
        /* ----------------------------------------------------------------------------- */
        KS_menuzord: function() {
            $("#menuzord").menuzord({
                align: "left",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
            $("#menuzord-right").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
            $("#menuzord-side-panel").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
            
            $("#menuzord-verticalnav").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
                /*indicatorFirstLevel: "<i class='fa fa-angle-right'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"*/
            });
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Waypoint Top Nav Sticky ------------------ */
        /* ---------------------------------------------------------------------- */
        KS_topnavAnimate: function() {
            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated").removeClass("animated-active");
            } else {
                $(".navbar-sticky-animated").addClass("animated-active");
            }

            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").removeClass("add-padding");
            } else {
                $(".navbar-sticky-animated .header-nav-wrapper .container, .navbar-sticky-animated .header-nav-wrapper .container-fluid").addClass("add-padding");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------- home section on scroll parallax & fade -------------- */
        /* ---------------------------------------------------------------------- */
        KS_homeParallaxFadeEffect: function() {
            if ($window.width() >= 1200) {
                var scrolled = $window.scrollTop();
                $('.content-fade-effect .home-content .home-text').css('padding-top', (scrolled * 0.0610) + '%').css('opacity', 1 - (scrolled * 0.00120));
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Top search toggle  ----------------------- */
        /* ---------------------------------------------------------------------- */
        KS_topsearch_toggle: function() {
            $(document.body).on('click', '#top-search-toggle', function(e) {
                e.preventDefault();
                $('.search-form-wrapper.toggle').toggleClass('active');
                return false;
            });
        }

    };

    KSOLUT.widget = {

        init: function() {

            var t = setTimeout(function() {
                KSOLUT.widget.KS_shopClickEvents();
                KSOLUT.widget.KS_fcCalender();
                KSOLUT.widget.KS_verticalTimeline();
                KSOLUT.widget.KS_verticalMasonryTimeline();
                KSOLUT.widget.KS_masonryIsotop();
                KSOLUT.widget.KS_pieChart();
                KSOLUT.widget.KS_progressBar();
                KSOLUT.widget.KS_funfact();
                KSOLUT.widget.KS_instagramFeed();
                KSOLUT.widget.KS_jflickrfeed();
                KSOLUT.widget.KS_accordion_toggles();
                KSOLUT.widget.KS_tooltip();
                //KSOLUT.widget.KS_countDownTimer();
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Shop Plus Minus ----------------------- */
        /* ---------------------------------------------------------------------- */
        KS_shopClickEvents: function() {
            $(document.body).on('click', '.quantity .plus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal)) {
                    $(this).parent().children(".qty").val(currentVal + 1);
                }
                return false;
            });

            $(document.body).on('click', '.quantity .minus', function(e) {
                var currentVal = parseInt($(this).parent().children(".qty").val(), 10);
                if (!isNaN(currentVal) && currentVal > 0) {
                    $(this).parent().children(".qty").val(currentVal - 1);
                }
                return false;
            });

            $(document.body).on('click', '#checkbox-ship-to-different-address', function(e) {
                $("#checkout-shipping-address").toggle(this.checked);
            });
        },


        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Event Calendar ------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_fcCalender: function() {
            if (typeof calendarEvents !== "undefined" ) {
                $('#full-event-calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2016-01-12',
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end) {
                        var title = prompt('Event Title:');
                        var eventData;
                        if (title) {
                            eventData = {
                                title: title,
                                start: start,
                                end: end
                            };
                            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                        }
                        $('#calendar').fullCalendar('unselect');
                    },
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: calendarEvents
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Timeline Block ------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_verticalTimeline: function() {
            var timelineBlocks = $('.cd-timeline-block'),
              offset = 0.8;

            //hide timeline blocks which are outside the viewport
            hideBlocks(timelineBlocks, offset);

            //on scolling, show/animate timeline blocks when enter the viewport
            $(window).on('scroll', function(){
              (!window.requestAnimationFrame)  ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100) : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
            });

            function hideBlocks(blocks, offset) {
              blocks.each(function(){
                ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
              });
            }

            function showBlocks(blocks, offset) {
              blocks.each(function(){
                ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
              });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------- Vertical Masonry Timeline -------------------- */
        /* ---------------------------------------------------------------------- */
        KS_verticalMasonryTimeline: function() {
            var $masonry_timeline = $('.vertical-masonry-timeline');
            $masonry_timeline.isotope({
                itemSelector : '.each-masonry-item',
                sortBy: 'original-order',
                layoutMode: 'masonry',
                resizable: false
            });

            //=====> Timeline Positions
            function  timeline_on_left_and_right(){
                $masonry_timeline.children('.each-masonry-item').each(function(index, element) {
                    var last_child = $(this);
                    var prev_last  = $(this).prev();
                    var last_child_offset = parseInt(last_child.css('top'), 10);
                    var prev_last_offset  = parseInt(prev_last.css('top'), 10);
                    var offset_icon       = last_child_offset - prev_last_offset;
                    
                    var go_top_to = 0;
                    if(offset_icon){
                        if ( offset_icon <= 87 ){
                            go_top_to = 87 - offset_icon;
                            last_child.find('.timeline-post-format').animate({
                                top: go_top_to
                            }, 300);
                        }
                    }
                    
                    if( $(this).position().left === 0 ){
                        $(this).removeClass('item-right');
                        $(this).addClass('item-left');
                    }else{
                        $(this).removeClass('item-left');
                        $(this).addClass('item-right');
                    }
                });
            }
            timeline_on_left_and_right();
            
            $(window).resize(function() {
                timeline_on_left_and_right();
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Masonry Isotope ------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_masonryIsotop: function() {
            var isotope_mode;
            if ($portfolio_gallery.hasClass("masonry")){
                isotope_mode = "masonry";
            } else{
                isotope_mode = "fitRows";
            }

            //isotope firsttime loading
            $portfolio_gallery.imagesLoaded(function(){
                $portfolio_gallery.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: isotope_mode,
                    filter: "*"
                });
            });
            
            //isotope filter
            $portfolio_filter.click(function(){
                $portfolio_filter.removeClass("active");
                $(this).addClass("active");
                var fselector = $(this).data('filter');

                $portfolio_gallery.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: isotope_mode,
                    filter: fselector
                });
                return false;
            });
            
            KSOLUT.slider.KS_flexslider();

        },

        KS_portfolioFlexSliderGalleryPopUpInit: function() {
            var $flexSliders = $portfolio_gallery.find('.slides');
            $flexSliders.each(function () {
                var _items = $(this).find("li > a");
                var items = [];
                for (var i = 0; i < _items.length; i++) {
                    items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
                }
                $(this).parent().parent().parent().find(".icons-holder").magnificPopup({
                    items: items,
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        },

        KS_isotopeGridRearrange: function() {
            var isotope_mode;
            if ($portfolio_gallery.hasClass("masonry")){
                isotope_mode = "masonry";
            } else{
                isotope_mode = "fitRows";
            }
            $portfolio_gallery.isotope({
                itemSelector: '.gallery-item',
                layoutMode: isotope_mode
            });
        },

        KS_isotopeGridShuffle: function() {
            $portfolio_gallery.isotope('shuffle');
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- CountDown ------------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_countDownTimer: function() {
            var $clock = $('#clock-count-down');
            var endingdate = $clock.data("endingdate");
            $clock.countdown(endingdate, function(event) {
                var countdown_text = '' +
                    '<ul class="countdown-timer">' +
                    '<li>%D <span>Days</span></li>' +
                    '<li>%H <span>Hours</span></li>' +
                    '<li>%M <span>Minutes</span></li>' +
                    '<li>%S <span>Seconds</span></li>' +
                    '</ul>';
                $(this).html(event.strftime(countdown_text));
            });
        },

        
        /* ---------------------------------------------------------------------- */
        /* ----------------------- pie chart / circle skill bar ----------------- */
        /* ---------------------------------------------------------------------- */
        KS_pieChart: function() {
            var $piechart = $('.piechart');
            $piechart.appear();
            $(document.body).on('appear', '.piechart', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var barcolor = current_item.data('barcolor');
                    var trackcolor = current_item.data('trackcolor');
                    var linewidth = current_item.data('linewidth');
                    var boxwidth = current_item.data('boxwidth');
                    current_item.css("width", boxwidth);
                    current_item.easyPieChart({
                        animate: 3000,
                        barColor: barcolor,
                        trackColor: trackcolor,
                        easing: 'easeOutBounce',
                        lineWidth: linewidth,
                        size: boxwidth,
                        lineCap: 'square',
                        scaleColor: false,
                        onStep: function(from, to, percent) {
                            $(this.el).find('span').text(Math.round(percent));
                        }
                    });
                    current_item.addClass('appeared');
                }
            });
        },
        
        /* ---------------------------------------------------------------------- */
        /* ------------------- progress bar / horizontal skill bar -------------- */
        /* ---------------------------------------------------------------------- */
        KS_progressBar: function() {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    var barcolor = current_item.data('barcolor');
                    current_item.append('<span class="percent">' + percent + '%' + '</span>').css('background-color', barcolor).css('width', percent + '%').addClass('appeared');
                }
                
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Funfact Number Counter ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_funfact: function() {
            var $animate_number = $('.animate-number');
            $animate_number.appear();
            $(document.body).on('appear', '.animate-number', function() {
                $animate_number.each(function() {
                    var current_item = $(this);
                    if (!current_item.hasClass('appeared')) {
                        current_item.animateNumbers(current_item.attr("data-value"), true, parseInt(current_item.attr("data-animation-duration"), 10)).addClass('appeared');
                    }
                });
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Instagram Feed ---------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_instagramFeed: function() {
            $('.instagram-feed').each(function() {
                var current_div = $(this);
                var instagramFeed = new Instafeed({
                    target: current_div.attr('id'),
                    get: 'user',
                    userId: current_div.data('userid'),
                    accessToken: current_div.data('accesstoken'),
                    resolution: current_div.data('resolution'),
                    limit: current_div.data('limit'),
                    template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                    after: function() {
                    }
                });
                instagramFeed.run();
            });

            $('.instagram-feed-carousel').each(function() {
                var current_div = $(this);
                var instagramFeed = new Instafeed({
                    target: current_div.attr('id'),
                    get: 'user',
                    userId: current_div.data('userid'),
                    accessToken: current_div.data('accesstoken'),
                    resolution: current_div.data('resolution'),
                    limit: current_div.data('limit'),
                    template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="fa fa-link"></i></a></figure></div>',
                    after: function() {
                        current_div.owlCarousel({
                            rtl: KSOLUT.isRTL.check(),
                            autoplay: false,
                            autoplayTimeout: 4000,
                            loop: true,
                            margin: 15,
                            dots: true,
                            nav: false,
                            responsive: {
                                0: {
                                    items: 2
                                },
                                768: {
                                    items: 4
                                },
                                1000: {
                                    items: 5
                                }
                            }
                        });
                    }
                });
                instagramFeed.run();
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Flickr Feed ----------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_jflickrfeed: function() {
            $(".flickr-widget .flickr-feed, .jflickrfeed").each(function() {
                var current_div = $(this);
                current_div.jflickrfeed({
                    limit: 9,
                    qstrings: {
                        id: current_div.data('userid')
                    },
                    itemTemplate: '<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_m}}" alt="{{title}}">  </a>'
                });
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------- accordion & toggles ------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_accordion_toggles: function() {
            var $panel_group_collapse = $('.panel-group .collapse');
            $panel_group_collapse.on("show.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").addClass("active");
            });
            $panel_group_collapse.on("hide.bs.collapse", function(e) {
                $(this).closest(".panel-group").find("[href='#" + $(this).attr("id") + "']").removeClass("active");
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- tooltip  ----------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_tooltip: function() {
            $('[data-toggle="tooltip"]').tooltip();
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Twitter Feed  --------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_twittie: function() {
            var $twitter_feed = $('.twitter-feed');
            var $twitter_feed_carousel = $('.twitter-feed-carousel');

            $twitter_feed.twittie({
                username: $twitter_feed.data('username'),
                dateFormat: '%b. %d, %Y',
                template: '{{tweet}} <div class="date">{{date}}</div>',
                count: 2,
                loadingText: 'Loading!'
            });

            $twitter_feed_carousel.twittie({
                username: $twitter_feed_carousel.data('username'),
                dateFormat: '%b. %d, %Y',
                template: '{{tweet}} <div class="date">{{date}}</div>',
                count: 4,
                loadingText: 'Loading!'
            }, function() {
                $twitter_feed_carousel.find('ul').owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 2000,
                    loop: true,
                    items: 1,
                    dots: true,
                    nav: false
                });
            });
        }
    };

    KSOLUT.slider = {

        init: function() {

            var t = setTimeout(function() {
                KSOLUT.slider.KS_typedAnimation();
                KSOLUT.slider.KS_flexslider();
                KSOLUT.slider.KS_owlCarousel();
                KSOLUT.slider.KS_maximageSlider();
                KSOLUT.slider.KS_bxslider();
            }, 0);

        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------- Typed Text Carousel  ---------------------- */
        /* ---------------------------------------------------------------------- */
        KS_typedAnimation: function() {
            if ($('.typed-text-carousel').length) {
                $('.typed-text-carousel').each(function() {
                    var string_1 = $(this).find('span:first-child').text();
                    var string_2 = $(this).find('span:nth-child(2)').text();
                    var string_3 = $(this).find('span:nth-child(3)').text();
                    var str = '';
                    var $this = $(this);
                    if (!string_2.trim() || !string_3.trim()) {
                        str = [string_1];
                    }
                    if (!string_3.trim() && string_2.length) {
                        str = [string_1, string_2];
                    }
                    if (string_1.length && string_2.length && string_3.length) {
                        str = [string_1, string_2, string_3];
                    }
                    var speed = $(this).data('speed');
                    var back_delay = $(this).data('back_delay');
                    var loop = $(this).data('loop');
                    $(this).typed({
                        strings: str,
                        typeSpeed: speed,
                        backSpeed: 0,
                        backDelay: back_delay,
                        cursorChar: "|",
                        loop: loop,
                        contentType: 'text',
                        loopCount: false
                    });
                });
            }
        },


        /* ---------------------------------------------------------------------- */
        /* -------------------------------- flexslider  ------------------------- */
        /* ---------------------------------------------------------------------- */
        KS_flexslider: function() {
            var $flexSlider = $('.flexslider-wrapper').find('.flexslider');
            if( $flexSlider.length > 0 ){
                $flexSlider.each(function() {
                    KSOLUT.widget.KS_portfolioFlexSliderGalleryPopUpInit();
                    var $flexsSlider = $(this),
                        flexsAnimation = $flexsSlider.parent().data('animation'),
                        flexsEasing = $flexsSlider.parent().data('easing'),
                        flexsDirection = $flexsSlider.parent().data('direction'),
                        flexsSlideshow = $flexsSlider.parent().data('slideshow'),
                        flexsSlideShowSpeed = $flexsSlider.parent().data('slidespeed'),
                        flexsAnimationSpeed = $flexsSlider.parent().data('animationspeed'),
                        flexsControlNav = $flexsSlider.parent().data('controlnav'),
                        flexsArrows = $flexsSlider.parent().data('arrows'),
                        flexsThumbnails = $flexsSlider.parent().data('thumbnails'),
                        flexsPauseHover = $flexsSlider.parent().data('pausehover');

                    if( !flexsAnimation ) { flexsAnimation = 'slide'; }
                    if( !flexsEasing || flexsEasing == 'swing' ) {
                        flexsEasing = 'swing';
                    }
                    if( !flexsDirection ) { flexsDirection = 'horizontal'; }
                    if( flexsSlideshow == false ) { flexsSlideshow = false; } else { flexsSlideshow = true; }
                    if( !flexsSlideShowSpeed ) { flexsSlideShowSpeed = 5000; }
                    if( !flexsAnimationSpeed ) { flexsAnimationSpeed = 600; }
                    if( flexsControlNav == false ) { flexsControlNav = false; } else { flexsControlNav = true; }
                    if( flexsThumbnails == true ) { flexsControlNav = 'thumbnails'; }
                    if( flexsArrows == false ) { flexsArrows = false; } else { flexsArrows = true; }
                    if( flexsPauseHover == false ) { flexsPauseHover = false; } else { flexsPauseHover = true; }

                    $flexsSlider.flexslider({
                        rtl: KSOLUT.isRTL.check(),
                        selector: ".slides > li",
                        animation: flexsAnimation,
                        easing: flexsEasing,
                        direction: flexsDirection,
                        slideshow: flexsSlideshow,
                        slideshowSpeed: Number(flexsSlideShowSpeed),
                        animationSpeed: Number(flexsAnimationSpeed),
                        pauseOnHover: flexsPauseHover,
                        controlNav: flexsControlNav,
                        directionNav: flexsArrows,
                        start: function(slider){
                            imagesLoaded($portfolio_gallery, function(){
                                setTimeout(function(){
                                    $portfolio_filter_first_child.trigger("click");
                                },500);
                            });
                            //var t = setTimeout( function(){ $('#portfolio.portfolio-masonry,#portfolio.portfolio-full,#posts.post-masonry').isotope('layout'); }, 1200 );
                            KSOLUT.initialize.KS_magnificPopup_lightbox();
                            KSOLUT.initialize.KS_prettyPhoto_lightbox();
                            KSOLUT.initialize.KS_nivolightbox();
                        },
                        after: function(){
                        }
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------------- Owl Carousel  ----------------------- */
        /* ---------------------------------------------------------------------- */
        KS_owlCarousel: function() {
            $('.owl-carousel-1col, .text-carousel, .image-carousel, .fullwidth-carousel').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav") === undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 1,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="pe-7s-angle-left"></i>',
                        '<i class="pe-7s-angle-right"></i>'
                    ]
                });
            });

            $('.owl-carousel-2col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 2,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 2
                        },
                        1170: {
                            items: 2
                        },
                        1300: {
                            items: 2
                        }
                    }
                });
            });

            $('.owl-carousel-3col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 3,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 2
                        },
                        1170: {
                            items: 3
                        },
                        1300: {
                            items: 3
                        }
                    }
                });
            });

            $('.owl-carousel-4col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 4,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: true
                        },
                        380: {
                            items: 2,
                            center: false
                        },
                        600: {
                            items: 3,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 3
                        },
                        1170: {
                            items: 4
                        },
                        1300: {
                            items: 4
                        }
                    }
                });
            });

            $('.owl-carousel-5col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 5,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 5
                        },
                        1300: {
                            items: 5
                        }
                    }
                });
            });

            $('.owl-carousel-6col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 6,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 6
                        },
                        1300: {
                            items: 6
                        }
                    }
                });
            });

            $('.owl-carousel-7col').each(function() {
                var data_dots = ( $(this).data("dots") === undefined ) ? false: $(this).data("dots");
                var data_nav = ( $(this).data("nav")=== undefined ) ? false: $(this).data("nav");
                var data_duration = ( $(this).data("duration") === undefined ) ? 4000: $(this).data("duration");
                $(this).owlCarousel({
                    rtl: KSOLUT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: data_duration,
                    loop: true,
                    items: 7,
                    margin: 15,
                    dots: data_dots,
                    nav: data_nav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 7
                        },
                        1300: {
                            items: 7
                        }
                    }
                });
            });
        },


        /* ---------------------------------------------------------------------- */
        /* ----------------------------- BxSlider  ------------------------------ */
        /* ---------------------------------------------------------------------- */
        KS_bxslider: function() {  
            $('.bxslider').bxSlider({
                mode: 'vertical',
                minSlides: 3,
                slideMargin: 20,
                pager: false,
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });   
        },


        /* ---------------------------------------------------------------------- */
        /* ---------- maximage Fullscreen Parallax Background Slider  ----------- */
        /* ---------------------------------------------------------------------- */
        KS_maximageSlider: function() {
            $('#maximage').maximage({
                cycleOptions: {
                    fx: 'fade',
                    speed: 1500,
                    prev: '.img-prev',
                    next: '.img-next'
                }
            });
        }
    };

    KSOLUT.documentOnResize = {

        init: function() {

            var t = setTimeout(function() {
                KSOLUT.initialize.KS_equalHeightDivs();
                KSOLUT.initialize.KS_resizeFullscreen();
            }, 0);

        }

    };


    KSOLUT.documentOnLoad = {

        init: function() {

            $window.trigger("scroll");
            $window.trigger("resize");
            
            var t = setTimeout(function() {
                KSOLUT.initialize.KS_wow();
                KSOLUT.widget.KS_twittie();
                KSOLUT.initialize.KS_magnificPopup_lightbox();
                KSOLUT.initialize.KS_preLoaderOnLoad();
                KSOLUT.initialize.KS_hashForwarding();
                KSOLUT.initialize.KS_parallaxBgInit();
            }, 0);

        }

    };

    //document ready
    KSOLUT.documentOnReady = {

        init: function() {
            KSOLUT.initialize.init();
            KSOLUT.header.init();
            KSOLUT.slider.init();
            KSOLUT.widget.init();
            KSOLUT.documentOnReady.windowscroll();
        },

        windowscroll: function(){

            $window.on( 'scroll', function(){

                KSOLUT.header.KS_scroolToTop();
                KSOLUT.header.KS_activateMenuItemOnReach();
                KSOLUT.header.KS_topnavAnimate();
            });
        }

    };

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    var $window = $(window),
        $html = $('html'),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $sections = $('section'),
        $portfolio_gallery = $(".gallery-isotope"),
        $portfolio_filter = $(".portfolio-filter a"),
        $portfolio_filter_first_child = $(".portfolio-filter a:eq(0)"),
        $portfolio_flex_slider = $(".portfolio-slider");

    /* ---------------------------------------------------------------------- */
    /* ---------------------------- Call Functions -------------------------- */
    /* ---------------------------------------------------------------------- */
    KSOLUT.initialize.KS_preLoaderClickDisable();
    $(document).ready(KSOLUT.documentOnReady.init);
    $window.load(KSOLUT.documentOnLoad.init);
    $window.on('resize', KSOLUT.documentOnResize.init);

})(jQuery);
