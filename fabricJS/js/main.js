(function () {
    var canvas = new fabric.Canvas('canvas');
    var canvas_el = document.getElementById('canvas');

    $(document).ready(function () {
        $('#create-text-obj').on('click', function () {
            var text = $('#text-input').val();
            create_text_obj(text);
        });

        $('#save-as-image').on('click', function () {
            save_canvas();
        });

        /* Bring active object to the front of the canvas */
        canvas.on('mouse:down', function (e) {
            if (!(typeof (e.target) === 'undefined')) {
                canvas.bringToFront(e.target);
            }
        });

        /* Define drag and drop zones */
        var $drop = $('#canvas-drop-area'),
            $gallery = $('#image-list li');

        /* Define the draggable properties */
        $gallery.draggable({
            start: function () {
                $drop.css({
                    'display': 'block'
                })
            },
            stop: function () {
                $(this).find('img').css({
                    'opacity': 0.4
                });
                $drop.css({
                    'display': 'none'
                });
            },
            revert: true
        });

        /* Define the events for droppable properties */
        $drop.droppable({
            over: function (event, ui) {
                $(this).addClass('active');
            },
            drop: function (event, ui) {
                var image = event.originalEvent.target.src,
                    loc = windowToCanvas(canvas_el, event.clientX, event.clientY);

                img_to_canvas(image, loc.x, loc.y);
            },
            out: function (event, ui) {
                $(this).removeClass('active');
            },
            deactivate: function (event, ui) {
                $(this).removeClass('active');
            }
        });
    });

    var create_text_obj = function(text) {
        var text_obj = new fabric.Text(text, {
            fontFamily: 'Delicious_500',
            left: 400,
            top: 225,
            fontSize: 80,
            textAlign: "left",
            fill: "#FF0000" // Set text color to red
        });

        canvas.add(text_obj);
    }

    var img_to_canvas = function(image, x, y) {
        var img = new Image();
        img.src = image;
        fabric.Image.fromURL(img.src, function (source) {
            img = source.set({
                left: x,
                top: y,
                angle: 0
            });
            canvas.add(img);
            canvas.renderAll();
        });
    }

    var windowToCanvas = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    var save_canvas = function() {
        window.location = canvas.toDataURL("image/png");
    }
})();