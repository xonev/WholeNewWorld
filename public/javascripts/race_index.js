var RI = typeof RI === "undefined" ? {} : RI;


RI.Index = (function () {
    var fadeSpeed = 'slow';
    
    $(document).ready(function () {
        $('.races > li > a').click(function (event) {
            var $this = $(this),
            raceUrl = '';
            event.preventDefault();
            raceUrl = $this.attr('href');
            loadRace(raceUrl);
        }).first().each(function () {
            loadRace($(this).attr('href'));
        });
    });

    function loadRace(url) {
        $.get(url, {}, onRaceLoaded, 'json');
    }
    
    function onRaceLoaded(data, textStatus, jqXHR) {
        var $img, $description;
        console.log('data.name: ' + data.name);
        console.log('Status: ' + textStatus);
        $img = $('#portrait');
        $img.fadeOut(fadeSpeed, function () {
            $img.attr('src', data.image);
            $img.fadeIn(fadeSpeed);
        });
        $description = $('#race-text');
        $description.fadeOut(fadeSpeed, function () {
            $description.html(data.description);
            $description.fadeIn(fadeSpeed);
        });
    }

    return {
    };
}());