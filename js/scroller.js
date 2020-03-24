let deactivatedElemArray = [];

$(function () {

    deactivatedElemArray.push(new ElementContainer(document.getElementById('scroller1')));
    deactivatedElemArray.push(new ElementContainer(document.getElementById('scroller2')));
    deactivatedElemArray.push(new ElementContainer(document.getElementById('scroller3')));
    deactivatedElemArray.push(new ElementContainer(document.getElementById('scroller4')));

    assignSpacing();
    update();

    // setInterval(() => {
    //     deactivatedElemArray.forEach(element => {
    //         moveElement(element);
    //     });
    // }, 16);
});

let update = function(){
    deactivatedElemArray.forEach(element => {
        moveElement(element);
    });
    window.requestAnimationFrame(update);
}

let assignSpacing = function()
{
    let spacing = window.innerWidth / (deactivatedElemArray.length - 1);
    let position= 0;

    deactivatedElemArray.forEach(element => {
        element.element.style.transform = `translateX(${position}px)`;
        element.count = position;
        position += spacing;
    });
}


let moveElement = function (element) {
    if (element.count > window.innerWidth + element.maxDistanceOff) {
        element.count = 0;
    }

    element.count += element.speed;
    element.sinStartValue += 0.05;

    let vPos = Math.sin(element.sinStartValue) * 20;

    element.element.style.transform = `translate(${element.count}px, ${vPos}px)`;
}

class ElementContainer {
    constructor(_element) {
        this.element = _element;
        this.count = 0;
        this.verticalStartPosition = (Math.random() * 20) + 40;
        this.maxDistanceOff = 165;
        this.sinStartValue = ((Math.random() * 2 * Math.PI));
        this.speed = Math.random() + 2;
        _element.style.top = `${this.verticalStartPosition}vh`
    }
}