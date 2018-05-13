(function($, window, document, undefined) {

    'use strict';

    (function() {

        var menuToggle = $('.btn__menu--toggle');
        var menuToggleDescription = $('.btn__menu--toggle--description');
        var menuOuter = $('.h');
        var activeClassName = 'h__menu-active';
        var drawerOuterClassName = 'h__desktop';
        var freeze = 'freeze';
        var scrim = 'scrim--active';
        var responsiveMaxWidth = 1023;

        var drawerCloseActionAccessability = function() {
            $('.'+drawerOuterClassName).attr('aria-expanded','false');
            menuToggleDescription.text('Open main navigation button');
        };
        var drawerCloseAction = function() {
            menuOuter.removeClass(activeClassName);
            $('html').removeClass(freeze).removeClass(scrim);
            drawerCloseActionAccessability();
        };
        var drawerOpenActionAccessability = function() {
            $('.'+drawerOuterClassName).attr('aria-expanded','true');
            menuToggleDescription.text('Close main navigation button');
        };
        var drawerOpenAction = function() {
            menuOuter.addClass(activeClassName);
            $('html').addClass(freeze).addClass(scrim);
            drawerOpenActionAccessability();
        };

        menuToggle.click(function(e) {
            e.preventDefault();
            if (menuOuter.hasClass(activeClassName)) {
                drawerCloseAction();
            } else {
                drawerOpenAction();
            }
        });
        $('.scrim').click(function(e) {
            e.preventDefault();
            drawerCloseAction();
        });

        // Listener - toggle nav closed classes on moving focus from an item within to an item outside the specified container
        var resizeEvent = function() {
            drawerCloseAction();
            if ($(window).width() > responsiveMaxWidth) {
                drawerCloseActionAccessability();
            }
        };
        $(window).on('resize', function () {
            resizeEvent();
        });
        resizeEvent();

        // Listener - toggle nav closed classes on moving focus from an item within to an item outside the specified container
        $(document.activeElement).on('focusin', function (e) {
            if ($('.' + activeClassName)[0]) {
                if ( $('.h .'+drawerOuterClassName+' a').is($(e.relatedTarget)) &&
                        !$('.h .'+drawerOuterClassName+' a').is($(e.target)) ) {
                    drawerCloseAction();
                }
            }
            return false;
        });

    })();

})(jQuery, window, document);

var menuItems = document.querySelectorAll('li.has-submenu');
Array.prototype.forEach.call(menuItems, function(el) {

    'use strict';

    el.querySelector('a').addEventListener('click', function(event) {
        if (this.parentNode.className === 'has-submenu') {
            this.parentNode.className = 'has-submenu open';
            this.setAttribute('aria-expanded', 'true');
        } else {
            this.parentNode.className = 'has-submenu';
            this.setAttribute('aria-expanded', 'false');
        }
        event.preventDefault();
        return false;
    });

});