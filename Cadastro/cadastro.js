
$(document).ready(function () {
    $('#alert').hide();
    $('#success').hide();
});

var email = document.getElementById("meu-email");

$(function () {
    $("#verifica").click(function () {
        if ($('#nome').val() === '' || $('#meu-email').val() === '') {
            $('#nome').val() === '' ? $('#erroNome').text("Nome obrigatório") : $('#erroNome').text("")
            $('#meu-email').val() === '' ? $('#erroEmail').text("Email obrigatório") : $('#erroEmail').text("");
            
        } else {
            if (email.value.includes("upf.br")) {
                $('#success').show();
                $('#success').delay(2000).fadeOut(function () {
                    $('#formulario').attr('action', 'webstorage.html').submit();
                });

            } else {
                var Browser = navigator.userAgent;
                if (navigator.userAgent.indexOf("Edg") != -1) {
                    Browser = 'img/edge.png';
                } else if (navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR') != -1)
                    Browser = 'img/opera.png';
                else if (navigator.userAgent.indexOf("Chrome") != -1)
                    Browser = 'img/chrome.png';
                else if (navigator.userAgent.indexOf("Safari") != -1)
                    Browser = 'img/safari.png';
                else if (navigator.userAgent.indexOf("Firefox") != -1)
                    Browser = 'img/firefox.png';

                $("#browserImg").attr("src", Browser);

                $('#alert').show();
                $('#alert').delay(2000).fadeOut(function () {
                    $('#formulario').submit();
                });
            }
        }
    });
});










