import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

export const k = kaboom({
    width: document.querySelector("body").width, 
    height: document.querySelector("body").height,
    scale: 1,
    background: [0, 0, 0, 1]
});

export default k;