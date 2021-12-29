const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#000000',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            // clear: true,
            save: true
        }
    }
});

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    let canvasData = [];
    let canvasDataIndex = -1;
    let painting = false;
    let fontSize = "2";

    

    let draw_color = "black";
    
    canvas.width = window.innerWidth - 400;
    canvas.height = window.innerHeight - 100;
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        canvasData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        canvasDataIndex++;
        ctx.beginPath();
    }

    function draw(e) {
        if(!painting) return;
        ctx.lineWidth = fontSize;
        ctx.lineCap = 'round';
        // ctx.lineJoin = 'round';
        // ctx.beginPath();
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.stroke();
        
    }

    function undoFunction() {
        if(canvasDataIndex<=0) clear();
        else {
            canvasDataIndex--;
            ctx.putImageData(canvasData[canvasDataIndex], 0, 0);
            canvasData.pop();
            
        }
    }
    function clear() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "whitesmoke";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        canvasData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    document.querySelector('.pen-range').addEventListener('input', () => {
        fontSize = document.querySelector('.pen-range').value;
    });

    pickr.on('change', (color) => {
        // document.querySelector('.pickr .pcr-butto::after').style.setProperty('background', 'var(color.toRGBA().toString())');
        draw_color = color.toRGBA().toString();
    });

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseout",endPosition);
    canvas.addEventListener("mouseup",endPosition);
    canvas.addEventListener("mousemove", draw);
    

    document.getElementById('undo-button').addEventListener('click', undoFunction);
    document.getElementById('clear-button').addEventListener('click', clear);


});
