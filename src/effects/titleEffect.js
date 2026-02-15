const chars = document.querySelectorAll(".effect-title");
function effectTitle(time) {
    for (let i = 0; i < chars.length; i++) {
        setTimeout(() => {
            chars[i].classList.toggle("effect");
            setTimeout(() => {
                if (chars[i].getAttribute("class").includes("effect")) {
                    chars[i].classList.toggle("effect");
                }
                else {
                    chars[i].classList.remove("effect");
                }
            }, time * i + 2000);
        }, time * i);
    }
    ;
    setTimeout(() => {
        effectTitle(time);
    }, time * chars.length);
}
;
effectTitle(400);
export {};
