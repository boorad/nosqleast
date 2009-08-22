function handle(path) {
    var p = $(path);
    if (!p.length) {
        p = $('#notfound');
        p.find('.command').text(path.substring(1));
    }
    p.clone().removeAttr('id').appendTo($('#commands')).show();
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
    $(this).animate({'opacity': '1'}, function() {
        $(this).animate({'opacity': '0'}, function() {
            $(this).blink();
        });
    });
};
$(function() {
    handle(location.hash);
    $('#cursor').blink();

    $(document.body).bind('keypress', function(event) {
        if (event.keyCode == 8) {
            $('#command').text($('#command').text().substring(0, $('#command').text().length-1));
            return false;
        } else if (event.keyCode == 13) {
            location.hash = '#' + $('#command').text();
            handle(location.hash);
        }
        var c = String.fromCharCode(event.charCode);
        $('#command').text($('#command').text() + c);
    });

});