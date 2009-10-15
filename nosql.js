if ((location.hostname == 'nosqleast.com') && (location.protocol == 'http:')) {
    window.location.href = 'http://nosqleast.com/';
}
function handle(path) {
    $(".cmddiv:visible").hide();
    var p = $(path.replace('/','-'));
    if (!p.length) {
        p = $('#notfound');
        p.find('.command').text(path.substring(1));
    }
    p.show();
}

$('a.command').live('mouseover', function() {
    $('#cursor').hide();
    if ($(this).is('.speaker')) {
        $('#command').text($(this).attr('href').replace('#','').replace('/', ' '));
    } else {
        $('#command').text($(this).text());
    }
});

$('a.command').live('mouseout', function() {
    $('#cursor').show();
    $('#command').text('');
});

$('a.command').live('click', function() {
    handle($(this).attr('href'));
});


$.fn.show = function() {
    $(this).removeClass('hidden').removeClass('alwaysHidden');
};
$.fn.hide = function() {
    $(this).addClass('hidden');
};
$.fn.blink = function() {
    var el = $(this);
    el.css('visibility', 'hidden');
    setTimeout(function() {
        el.css('visibility', '');
        setTimeout(function() {
            el.blink();
        }, 500);
    }, 500);
};

$(function() {
    handle(location.hash);
    $('#cursor').blink();
    $(document).bind('keypress', function(event) {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.keyCode == 8) { // Backspace
            $('#command').text($('#command').text().substring(0, $('#command').text().length-1));
            return false;
        } else if (event.keyCode == 13) { // Enter
            location.hash = '#' + $('#command').text();
            handle(location.hash);
            $('#command').text('');
        }
        if (event.charCode) {
            var c = String.fromCharCode(event.charCode);
            $('#command').text($('#command').text() + c);
        }
    });
    $(document).bind('keydown', function(event) {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.keyCode == 9) { // Tab
            var t = $('#command').text();
            $('.cmddiv').each(function(i, el) {
                if ($(el).attr('id').substring(0, t.length) == t) {
                    $('#command').text($(el).attr('id'));
                    return false;
                }
            });
        }
    });
});
