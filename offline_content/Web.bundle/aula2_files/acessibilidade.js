
/* Acessibilidade Aumentar e diminuir letras*/
//DIMINUIR E AUMENTAR
var btnAumentar = $("#btnAumentar");
var btnDiminuir = $("#btnDiminuir");
var elemento = $("body") //encontra todos os elementos dentro do #content
var fonts = [];
var contador = 0;
var contadormenos = 0;

var btnDiminuirInibido = $("#btnDiminuir").prop('disabled', true);
  function obterTamanhoFonte() {
    for (var f = 0; f < elemento.length; f++) {
      fonts.push(parseFloat(elemento.eq(f).css('font-size')));
    }
  }

  
obterTamanhoFonte();

  btnAumentar.on('click', function() {
      
      if(contador >=0 && contador <=2){
          contador = contador +1;
        for (var i = 0; i < elemento.length; i++) {
          ++fonts[i];
          elemento.eq(i).css('font-size', fonts[i]);
          console.log(contador);
          var btnDiminuirEnable = $("#btnDiminuir").prop('disabled', false);
        }
      }else{
          console.log(contador);

      }
  });

  btnDiminuir.on('click', function() {
       
    if(contador >0){
      contador = contador -1;
      for (var i = 0; i < elemento.length; i++) {
       --fonts[i];
       console.log(contador);
        elemento.eq(i).css('font-size', fonts[i]);
      }
    }else{
      console.log(contador);
    }  
  });

/* Acessibilidade Aumentar e diminuir letras*/


/* Acessibilidade Alto Contraste*/




$(document).ready(function() {
   if($.cookie("contrast-bar")) {setActiveStyleSheet($.cookie("contrast-bar"));}

   $('#btn-altocontraste').click(function(e) {
       e.preventDefault();
       if ( getActiveStyleSheet() == '1') {
               setActiveStyleSheet('2');

               $('#btn-altocontraste').find('i.fa-adjust').addClass('flip-horizontal-1');

       } else {
               setActiveStyleSheet('1');
                $('#btn-altocontraste').find('i.fa-ban').removeClass('flip-horizontal-1').addClass('flip-horizontal-0');
       }
   });
});



function setActiveStyleSheet(title) {
       var i, a, main;
       for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {

               if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
                       a.disabled = true;
                       if(a.getAttribute("title") == title) a.disabled = false;
               }
       }
       $.cookie("contrast-bar",title, {expires: 365, path: '/'});
}

function getActiveStyleSheet() {
       var i, a;
       for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
               if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
       }
       return null;
}

function getPreferredStyleSheet() {
       var i, a;
       for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
               if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) return a.getAttribute("title");
       }
       return null;
}



jQuery.cookie = function(name, value, options) {
if (typeof value != 'undefined') { // name and value given, set cookie
options = options || {};
if (value === null) {
value = '';
options.expires = -1;
}
var expires = '';
if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
var date;
if (typeof options.expires == 'number') {
date = new Date();
date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
} else {
date = options.expires;
}
expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
}
// CAUTION: Needed to parenthesize options.path and options.domain
// in the following expressions, otherwise they evaluate to undefined
// in the packed version for some reason...
var path = options.path ? '; path=' + (options.path) : '';
var domain = options.domain ? '; domain=' + (options.domain) : '';
var secure = options.secure ? '; secure' : '';
document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
} else { // only name given, get cookie
var cookieValue = null;
if (document.cookie && document.cookie != '') {
var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
var cookie = jQuery.trim(cookies[i]);
// Does this cookie string begin with the name we want?
if (cookie.substring(0, name.length + 1) == (name + '=')) {
cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
break;
}
}
}
return cookieValue;
}
};



(function () {
    var Contrast = {
        storage: 'contrastState',
        cssClass: 'contrast',
        currentState: null,
        check: checkContrast,
        getState: getContrastState,
        setState: setContrastState,
        toogle: toogleContrast,
        updateView: updateViewContrast
    };

    window.toggleContrast = function () { Contrast.toogle(); };

    Contrast.check();

    function checkContrast() {
        this.updateView();
    }

    function getContrastState() {
        return localStorage.getItem(this.storage) === 'true';
    }

    function setContrastState(state) {
        localStorage.setItem(this.storage, '' + state);
        this.currentState = state;
        this.updateView();
    }

    function updateViewContrast() {
        var body = document.body;

        if (this.currentState === null)
            this.currentState = this.getState();

        if (this.currentState)
            body.classList.add(this.cssClass);
        else
            body.classList.remove(this.cssClass);
    }

    function toogleContrast() {
        this.setState(!this.currentState);
    }
})();







