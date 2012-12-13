var canvas = new fabric.Canvas('canvas');
var canvas_el = document.getElementById('canvas');
var div = document.getElementById('sample');

$(document).ready(function(){
    $('#create-text-obj').on('click', function(){
        var text = $('#text-input').val();
        create_text_obj(text);
    });

    // $('.draggable-image').on('click', function(){
    //     var img = $(this).attr('src');
    //     img_to_canvas(img);
    // });

    $('#save-as-image').on('click', function(){
        save_canvas();
    });
});


function create_text_obj(text){
    var text_obj = new fabric.Text(text, { 
            fontFamily: 'Delicious_500', 
            left: 400,
            top: 225,
            fontSize: 80,
            textAlign: "left",
            fill:"#FF0000"  // Set text color to red
        });

    canvas.add(text_obj);
}

function img_to_canvas(image){
    var img = new Image();
        img.src = image;
    fabric.Image.fromURL(img.src, function(source) {
        img = source.set({ left: 250, top: 250, angle: 0 });
        canvas.add(img);
        canvas.renderAll();
    });
}

function save_canvas(){
    window.location = canvas.toDataURL("image/png");
}


// Drag and drop

function handleDragStart(e) {
    // this / e.target is the source node.
    $(this).css({'opacity':0.4});
}

function handleDragOver(e) {
    // Necessary. Allows us to drop.
    if (e.preventDefault) {
        e.preventDefault();
    }   
    $(this).css({'border':'1px solid red'});
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    $(this).addClass('over');
}

function handleDragLeave(e) {
    $(this).css({'border':'none'}).end().removeClass('over');
}

function handleDrop(e) {
    // this / e.target is current target element.
    if (e.preventDefault){
        e.preventDefault();
    }
    img_to_canvas(e.dataTransfer.getData('Source'));
    $(this).css({'border':'none','display':'none'});
    // See the section on the DataTransfer object.
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        return false;
    });
}

var dragItems = document.querySelectorAll('#image-list li img');
var drop = document.querySelector('#canvas-drop-area');
for (var i = 0; i < dragItems.length; i++) {
    dragItems[i].addEventListener('dragstart', function (event) {
        this.style.opacity = '0.4';  // this / e.target is the source node.

        // store the ID of the element, and collect it on the drop later on
        drop.style.display = 'block';
        event.dataTransfer.setData('Source', this.src);

        // Set the drag icon image
        // var dragIcon = document.createElement('img');
        // dragIcon.src = this.src;
        // dragIcon.style = 'max-height: 100px; max-width:100px;'
        // event.dataTransfer.setDragImage(dragIcon, -10, -10);
        return false;
    });
}



// Tells the browser that we *can* drop on this target

drop.addEventListener('dragover', handleDragOver, false);
drop.addEventListener('dragleave', handleDragLeave, false);
// drop.addEventListener('dragenter', false);
drop.addEventListener('drop', handleDrop,false);
// [].forEach.call(cols, function(col) {
//     col.addEventListener('dragstart', handleDragStart, false);
//     canvas_el.addEventListener('dragenter', handleDragEnter, false)
//     canvas_el.addEventListener('dragover', handleDragOver, false);
//     // canvas_el.addEventListener('dragleave', handleDragLeave, false);
//     canvas_el.addEventListener('drop', handleDrop, false);
//     // col.addEventListener('dragend', handleDragEnd, false);
// });