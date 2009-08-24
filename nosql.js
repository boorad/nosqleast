function handle(path) {
    var cmddivs = $(".cmddiv:visible");
    cmddivs.hide();
    var p = $(path);
    if (!p.length) {
        p = $('#notfound');
        p.find('.command').text(path.substring(1));
    }
    p.show();
    //$('#commands').replaceWith(p.show());
    //p.clone().removeAttr('id').replaceWith($('#commands')).show();
    //p.remove();
}

$('a[href="#home"]').live('click', function() {
    window.hash = '';
    return false;
});

$('a.command').live('mouseover', function() {
    $('#cursor').hide();
    $('#command').text($(this).text());
});

$('a.command').live('mouseout', function() {
    $('#cursor').show();
    $('#command').text('');
});

$('a.command').live('click', function() {
    handle($(this).attr('href'));
});


$.fn.show = function() {
    $(this).removeClass('hidden');
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
        if (event.keyCode == 8) {
            $('#command').text($('#command').text().substring(0, $('#command').text().length-1));
            return false;
        } else if (event.keyCode == 13) {
            location.hash = '#' + $('#command').text();
            handle(location.hash);
            $('#command').text('');
        }
        var c = String.fromCharCode(event.charCode);
        $('#command').text($('#command').text() + c);
    });

});
