var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '0',
        width: '0',
        videoId: 'i4PiyTpDX1c'
    });
}

function linkMusic() {

    var musicas = $('.musica__item');

    musicas.on('click', function() {

        var videoId = $(this).attr('data-videoId');
        var artist = $(this).attr('data-artist');
        var song = $(this).attr('data-song');

        $('.title').text(artist + " - " + song);

        mudarMusica(videoId, artist, song);
    })
    
}

function mudarMusica(videoId, artist, song) {
    
    player.destroy();
    
    player = new YT.Player('ytplayer', {
        height: '300',
        width: '400',
        videoId: videoId
    });

    searchLyrics(artist, song);
}

function searchLyrics(artist, song) {
    
    $.getJSON(
        "https://api.vagalume.com.br/search.php"
            + "?art=" + encodeURI(artist).replace('%20', '+')
            + "&mus=" + encodeURI(song).replace('%20', '+'),
            + "&apikey={key}",
        function (data) {
            $('.letra').text(data.mus[0].text);
        }
    );
}

function loadMusic() {
    var url = 'https://api.myjson.com/bins/19ajl2';

    $.getJSON(url, function(data) {

        var _table = $('.lista-musica ul');
        var _template = '';

        data.forEach(element => {
            _template += `<li data-videoId="${element.videoId}" data-artist="${element.artist}" data-song="${element.song}" class="musica__item">${element.artist} - ${element.song}</li>`
            
        });

        _table.html(_template);

        linkMusic();
    })
}

$(document).ready(function() {
    loadMusic();
});