(function ( $ ) {
 
    $.fn.my_wysiwyg = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "red",
            backgroundColor: "white",
            bold: this.before('<button id="make-bold" class="btn" value="b"><img src="./icons/bold.png" alt="Bold button"></button>'),
            italic: this.before('<button id="make-italic" class="btn" value="i"><img src="./icons/italic.png" alt="Italic button"></button>'),
            underline: this.before('<button id="text-underline" class="btn" value="u"><img src="./icons/underline.png" alt="Underline button"></button>') ,
            strike: this.before('<button id="text-strikethrough" class="btn" value="s"><img src="./icons/strikethrough.png" alt="Strikethrough button"></button>') ,
            left_align: this.before('<button id="text-align-left" class="btn1"><img src="./icons/left-align.png" alt="Left-align button"></button>') ,
            center_align: this.before('<button id="text-align-center" class="btn1"><img src="./icons/center-align.png" alt="Center-align button"></button>') ,
            right_align: this.before('<button id="text-align-right" class="btn1"><img src="./icons/right-align.png" alt="Right-align button"></button>') ,
            justify: this.before('<button id="text-align-justify" class="btn1"><img src="./icons/justification.png" alt="Justification-align button"></button>') ,
            swap: this.before('<button id="swap" class="btn3"><i class="fa-solid fa-arrow-right-arrow-left"></i></button>')
        }, options );

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor,
        });
 
    };

    // $.fn.my_wysiwyg = function( button ) {
 
    //     // This is the easiest way to have default options.
    //     var button = $.extend({
    //         // These are the defaults.
    //         bold: $('<button id="make-bold" class="btn" value="b"><img src="./icons/bold.png" alt="Bold button"></button>'),
    //         italic: $('<button id="make-italic" class="btn" value="i"><img src="./icons/italic.png" alt="Italic button"></button>') ,
    //         underline: $('<button id="text-underline" class="btn" value="u"><img src="./icons/underline.png" alt="Underline button"></button>') ,
    //         strike: $('<button id="text-strikethrough" class="btn" value="s"><img src="./icons/strikethrough.png" alt="Strikethrough button"></button>') ,
    //         left_align: $('<button id="text-align-left" class="btn1"><img src="./icons/left-align.png" alt="Left-align button"></button>') ,
    //         center_align: $('<button id="text-align-center" class="btn1"><img src="./icons/center-align.png" alt="Center-align button"></button>') ,
    //         right_align: $('<button id="text-align-right" class="btn1"><img src="./icons/right-align.png" alt="Right-align button"></button>') ,
    //         justify: $('<button id="text-align-justify" class="btn1"><img src="./icons/justification.png" alt="Justification-align button"></button>') ,
    //         swap: $('<button id="swap" class="btn3"><i class="fa-solid fa-arrow-right-arrow-left"></i></button>')
    //     }, button);
 
    //     // Greenify the collection based on the settings variable.
    //     return this.append(
    //         [
    //         bold = button.bold,
    //         italic = button.italic,
    //         underline = button.underline,
    //         strike = button.strike,
    //         left_align = button.left_align,
    //         center_align = button.center_align,
    //         right_align = button.right_align,
    //         justify = button.justify,
    //         swap = button.swap
    //     // });
    //         ]);
 
    // };
 
}( jQuery ));

function getPositions()
{
  var startPosition = endPosition = 0;
  var element = document.getElementById('selectable');
  if (document.selection) 
  {
    //for Internet Explorer
    var range = document.selection.createRange();
    var drange = range.duplicate();
    drange.moveToElementText(element);
    drange.setEndPoint("EndToEnd", range);
    startPosition = drange.text.length - range.text.length;
    endPosition = startPosition  + range.text.length;
  }
  else if (window.getSelection) 
  {
    //For Firefox, Chrome, Safari etc
    startPosition = element.selectionStart;
    endPosition = element.selectionEnd;
    
  }
  return {'start': startPosition, 'end': endPosition};
}

// document.getElementById('selectable').addEventListener('keyup',function(){
//     document.getElementById('display').innerHTML = document.getElementById('selectable').value;
// })  

$(document).ready(function () {
    
    // make text bold
    $('.btn').click(function () { 
        var positions = getPositions();
        // e.preventDefault();
        console.log("Making selected text bold")
        if(positions.start == positions.end)
        {
            return false;
        }      

        var tag = $(this).val();
        var textOnPage = $('#selectable').val();

        var startString = textOnPage.substr(0, positions.start);
        
        var targetString = textOnPage.substr(positions.start, positions.end - positions.start);
        var formattedString = "<" + tag +">" + targetString + "</" +  tag +">";
        var endString = textOnPage.substr(positions.end);
        // $('#selectable').text(startString + formattedString + endString);
        document.getElementById('selectable').value = startString + formattedString + endString;
        // document.getElementById('display').innerHTML = document.getElementById('selectable').value;
    });

    $("#text-align-left").click(function (e) {
        e.preventDefault();
        console.log("Align selected text left");
        
        $('#selectable').css('text-align', 'left');
    });

    $("#text-align-center").click(function (e) {
        e.preventDefault();
        console.log("Align selected text center");
        
        $('#selectable').css('text-align', 'center');
    });

    $("#text-align-right").click(function (e) {
        e.preventDefault();
        console.log("Align selected text right");
        
        $('#selectable').css('text-align', 'right');
    });

    $("#text-align-justify").click(function (e) {
        e.preventDefault();
        console.log("Align selected text justify");
        
        $('#selectable').css('text-align', 'justify');
    });

    $("#swap").click(function() {
        var textArea = document.querySelector(' textarea ')
        var styled = window.getComputedStyle(textArea).getPropertyValue("text-align");
        // styled = window.getComputedStyle(document.querySelector(' textarea ')).text-align
        console.log(styled)
        if (styled == "left") {
            document.getElementById('display').innerHTML = document.getElementById('selectable').value;
            document.getElementById('display').setAttribute('style', 'text-align : left');
        } else if (styled == "center") {
            document.getElementById('display').innerHTML = document.getElementById('selectable').value;
            document.getElementById('display').setAttribute('style', 'text-align : center');
        } else if (styled == "right") {
            document.getElementById('display').innerHTML = document.getElementById('selectable').value;
            document.getElementById('display').setAttribute('style', 'text-align : right');
        } else if (styled == "justify") {
            document.getElementById('display').innerHTML = document.getElementById('selectable').value;
            document.getElementById('display').setAttribute('style', 'text-align : justify');
        }
      });

});

var input_textarea = document.querySelector('.text_input');
var output_div = document.querySelector('#display');
var save_button = document.querySelector('.save');

save_button.addEventListener('click', updateOutput);

input_textarea.value = localStorage.getItem('SAVE');

function updateOutput() {
	localStorage.setItem('SAVE', input_textarea.value);
}

window.onload = function () {
	if (localStorage.getItem("SAVE")) {
		input_textarea.innerHTML = localStorage.getItem('SAVE');
	}
}

var AutoSave = (function(){

	var timer = null;

	function getEditor(){

		var elems = document.getElementsByTagName("textarea")
		if (elems.length <= 0) {
			return null;
		}
		return elems[0];
	}


	function save(){

		var editor = getEditor(); 

        if (editor) {
		    localStorage.setItem("SAVE", editor.value )
        }

	}


	function restore(){

		var saved = localStorage.getItem("SAVE")
		var editor = getEditor();
		if (saved && editor){

			editor.value = saved; 
		}
	}

	return { 

		start: function(){

			var editor = getEditor(); 

		 
			if (editor.value.length <= 0) {
				restore();
			}

			if (timer != null){
				clearInterval(timer);
				timer = null;
			}

			timer = setInterval(save, 10000);
		},

		stop: function(){

			if (timer){ 
				clearInterval(timer);
				timer = null;
			}

		}
	}

}())

window.onbeforeunload = function (e) {
    var input = input_textarea.value
    var saved = localStorage.getItem("SAVE")
	if (input == saved) {

	} else {
		e.preventDefault();
	}
};