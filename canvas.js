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

    document.querySelector('.color-picker').addEventListener('input', () => {
        draw_color = document.querySelector('.color-picker').value;
    });

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseout",endPosition);
    canvas.addEventListener("mouseup",endPosition);
    canvas.addEventListener("mousemove", draw);
    

    document.getElementById('undo-button').addEventListener('click', undoFunction);
    document.getElementById('clear-button').addEventListener('click', clear);


});