const player = document.getElementById("player");
const zona = document.getElementById("zona-juego");

const zonas = [
    document.getElementById("main-page"),
    document.getElementById("main-contact"),
    document.getElementById("main-project"),
];

let zonaActiva = null;

let x = 0;
let y = 0;
let velocidad = 5;

let right = false;
let left = false;
let up = false;
let down = false;

// 🎬 SPRITE
let frame = 0;
let frameWidth = 128;
let totalFrames = 10;
let contador = 0;

document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight") right = true;
    if(e.key === "ArrowLeft") left = true;
    if(e.key === "ArrowUp") up = true;
    if(e.key === "ArrowDown") down = true;

    if(e.key === "Enter" && zonaActiva){
        if(zonaActiva.id === "main-page")    window.location.href = "home.html";
        if(zonaActiva.id === "main-contact") window.location.href = "formulario.html";
        if(zonaActiva.id === "main-project") window.location.href = "formularioo.html";
    }
});

document.addEventListener("keyup", (e) => {
    if(e.key === "ArrowRight") right = false;
    if(e.key === "ArrowLeft") left = false;
    if(e.key === "ArrowUp") up = false;
    if(e.key === "ArrowDown") down = false;
});

function gameLoop(){

    // 🔹 1. MOVIMIENTO
    if(right) x += velocidad;
    if(left) x -= velocidad;
    if(up) y -= velocidad;
    if(down) y += velocidad;

    // 🔹 2. LÍMITES de la pantalla
    const zonaWidth = zona.clientWidth;
    const zonaHeight = zona.clientHeight;
    const playerWidth = player.clientWidth;
    const playerHeight = player.clientHeight;

    if (x < 0) x = 0;
    if (x > zonaWidth - playerWidth)   x = zonaWidth - playerWidth;
    if (y < 0) y = 0;
    if (y > zonaHeight - playerHeight) y = zonaHeight - playerHeight;

    // 🔹 3. ANIMACIÓN
    if(right || left || up || down){
        contador++;
        if(contador % 5 === 0){
            frame++;
            if(frame >= totalFrames) frame = 0;
        }
    } else {
        frame = 0;
    }

    player.style.backgroundPosition = `-${frame * frameWidth}px 0px`;

    // 🔹 4. FLIP IZQUIERDA
    if(left){
        player.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
    } else {
        player.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
    }

    // 🔹 5. COLISIONES — solo resalta, no bloquea movimiento
    const playerRect = player.getBoundingClientRect();

    zonaActiva = null;

    zonas.forEach(z => z.classList.remove("opcion-activa"));

    zonas.forEach(boton => {
        const botonRect = boton.getBoundingClientRect();

        const colision = !(
            playerRect.right  < botonRect.left  ||
            playerRect.left   > botonRect.right ||
            playerRect.bottom < botonRect.top   ||
            playerRect.top    > botonRect.bottom
        );

        if(colision){
            boton.classList.add("opcion-activa");
            zonaActiva = boton;
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();