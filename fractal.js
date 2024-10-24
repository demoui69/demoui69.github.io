const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zoom = 1, panX = 0, panY = 0;

// Mandelbrot calculation
function drawFractal() {
    const maxIterations = 100;
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let zx = (x / zoom - canvas.width / 2) * 4 / canvas.width + panX;
            let zy = (y / zoom - canvas.height / 2) * 4 / canvas.height + panY;
            let cx = zx, cy = zy;
            let i;
            for (i = 0; i < maxIterations; i++) {
                let xt = zx * zx - zy * zy + cx;
                zy = 2.0 * zx * zy + cy;
                zx = xt;
                if (zx * zx + zy * zy > 4.0) break;
            }
            let color = i === maxIterations ? 0 : (i * 255 / maxIterations);
            const index = (x + y * canvas.width) * 4;
            imageData.data[index + 0] = color;  // Red
            imageData.data[index + 1] = color;  // Green
            imageData.data[index + 2] = color;  // Blue
            imageData.data[index + 3] = 255;    // Alpha
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// Handle Zoom
canvas.addEventListener('wheel', function (event) {
    zoom += event.deltaY * -0.01;
    zoom = Math.min(Math.max(1, zoom), 100);  // Limit zoom levels
    drawFractal();
});

// Initial render
drawFractal();
