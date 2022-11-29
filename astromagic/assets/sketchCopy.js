p5.disableFriendlyErrors = true;

url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Philadelphia?unitGroup=us&include=days&key=W2MX5BG5NHFHC2LEP84U38X7F&contentType=json";
let data;
let weather;
let moonPhase;
let moonText;
let mType;
let mapMoon = 0;
let archiver;
let moonImgs;
let sw = true;
let screenW;
let minRando = 0;
let maxRando = 0;
let moonImageSize = 0
let makeVisible = false;
let scrollPos = 0;
let scrollHeight = 0;
let mx = 0;
let xoff = 0.0;
let allMoonImgs = [];

function setup() {

    loadJSON(url, gotData);
    archiver = select(".archiveView");
    archiver.mousePressed(changeView);
    moonImgs = selectAll('img');
}

function draw() {

    if (window.innerWidth <= 600) {
        moonImageSize = 200;
    } else {
        moonImageSize = 400;
    }


    for (i = 0; i < allMoonImgs.length; i++) {
        allMoonImgs[i].move()
    }
}

function gotData(data) {
    // print(data);
    weather = data;
    moonPhase = weather.days[0].moonphase;
    print(moonPhase);
    mType = (getMoon(moonPhase));
    moonImgs = selectAll('img');

    // checkMoonSize()

    for (i = 0; i < moonImgs.length; i++) {
        allMoonImgs[i] = new MoonImage(moonImgs[i]);
    }

    for (i = 0; i < allMoonImgs.length; i++) {
        allMoonImgs[i].show();
    }

}

function checkMoonSize() {
    // print("the window size is: " + window.innerWidth)
    //check screen size
    if (window.innerWidth <= 600) {
        minRando = -75;
        maxRando = 25;
        moonImageSize = 200;
    } else {
        minRando = -400;
        maxRando = 50;
        moonImageSize = 400;
    }

    if (moonPhase >= 0 && moonPhase <= .5) {
        // mapMoon = int(map(moonPhase, 0, .5, (-1 * moonImageSize), 0));
        // print("towards full moon")
    } else if (moonPhase >= .51 && moonPhase <= 1) {
        // mapMoon = int(map(moonPhase, .5, 1, 0, moonImageSize));
        // print("towards new moon")
    }
    // print(maxRando, minRando, moonImageSize, mapMoon);
}

function changeView() {

    checkMoonSize()

    if (sw == true) {
        for (i = 0; i < moonImgs.length; i++) {

            moonImgs[i].style("object-position", "0" + " 0");
            moonImgs[i].addClass("archive");
        }
        sw = false;
    } else {
        for (i = 0; i < moonImgs.length; i++) {
            let chooseMargin = ["marginLeft", "marginRight"]
            moonImgs[i].style("object-position", mapMoon + "px" + " 0");
            moonImgs[i].removeClass("archive");
        }
        sw = true;
    }
}


class MoonImage {

    constructor(img) {
        // this.mx = random(width);
        this.xoff = 0.0;
        this.mover = Math.floor(random(-50, 100));
        this.minRando = 0;
        this.maxRando = 0;
        this.img = img;
        this.randomOff = random(0.1, 2);
    }



    show() {
        checkMoonSize();
        this.img.style("marginRight", Math.floor(random(minRando, maxRando)) + "px");
        this.img.style("marginBottom", Math.floor(random(minRando, maxRando)) + "px");
        this.img.style("object-position", this.mover + "px" + " 0");
        this.img.style("opacity", ".75");

    }

    move() {

        if (this.xoff <= windowWidth / 2) {
            // mapMoon = int(map(moonPhase, 0, .5, (-1 * moonImageSize), 0));
            this.mover = int(map(this.xoff, 0, windowWidth / 2, -moonImageSize, moonImageSize))
        } else if (this.xoff >= windowWidth / 2) {
            // mapMoon = int(map(moonPhase, .5, 1, 0, moonImageSize));
            this.mover = int(map(this.xoff, windowWidth / 2, windowWidth, moonImageSize, moonImageSize * 2))
        }
        this.img.style("object-position", this.mover + "px" + " 0");


        if (this.mover >= moonImageSize+20) {
            this.xoff = -20;
        } else {
            this.xoff = this.xoff + this.randomOff;
        }
    }

}


function getMoon(m) {
    if (m >= 0 && m <= .25) {
        return "Waxing Crescent";
    } else if (m >= .25 && m <= .5) {
        return "Waxing Gibbous";
    } else if (m >= 0.5 && m <= .75) {
        return "Waning Gibbous";
    } else if (m >= 0.75 && m <= 1) {
        return "Waning Crescent";
    } else if (m == 0 || m == 1) {
        return "New Moon";
    } else if (m == .25) {
        return "First Quarter";
    } else if (m == .5) {
        return "Full Moon";
    } else if (m == .75) {
        return "Last Quarter";
    }
}

window.addEventListener("load", (event) => {

    let lastKnownScrollPosition = 0;
    document.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY;
        scrollHeight = document.body.clientHeight;
        scrollMoon(lastKnownScrollPosition, scrollHeight);

    });
    console.log("page is fully loaded");

});

counter = 0;

function scrollMoon(pos, totalHeight) {
    moonText = select("#staticText");
    centerText = select("#centerText")
    archiveView = select(".archiveView");
    moonText.removeClass("introMover");
    moonText.removeClass("introSpin");
    let tx = moonText.html()
    // detectChange(tx);


    if (pos > 0 && pos < totalHeight * .1) {

        moonText.html("↓");
        counter++;
        // moonText.toggleClass("animateOn")
    }
    else if (pos > totalHeight * .1 && pos < totalHeight * .2) {
        moonText.html("The");
        // moonText.toggleClass("animateOn")
        counter++;

        // moonText.style("transform","translateX(-45vw)");

    }
    else if (pos > totalHeight * .2 && pos < totalHeight * .3) {
        moonText.html("The moon");
        // moonText.toggleClass("animateOn")
        counter++;

        // moonText.style("transform","translateX(-40vw)");
    }
    else if (pos > totalHeight * .3 && pos < totalHeight * .4) {
        moonText.html("The moon is");
        // moonText.toggleClass("animateOn")
        // moonText.style("transform","translateX(-35vw)");

    }
    else if (pos > totalHeight * .4 && pos < totalHeight * .5) {
        moonText.html("The moon is getting");
        // moonText.toggleClass("animateOn")
        // moonText.style("transform","translateX(-30vw)");

    }
    else if (pos > totalHeight * .5 && pos < totalHeight * .6) {
        moonText.html("The moon is getting closer");
        // moonText.style("transform","translateX(-25vw)");

    }
    else if (pos > totalHeight * .6 && pos < totalHeight * .7) {
        moonText.html("The moon is getting closer to");
        // moonText.style("transform","translateX(-20vw)");
    }
    else if (pos > totalHeight * .7 && pos < totalHeight * .8) {
        moonText.html("The moon is getting closer to your");
        // moonText.style("transform","translateX(-15vw)");

    }
    else if (pos > totalHeight * .8 && pos < totalHeight * .9) {
        moonText.html("The moon is getting closer to your hand");
        // moonText.style("transform","translateX(-10vw)");

    }
    else if (pos > totalHeight * .9 && pos < (totalHeight - (window.innerHeight * 2))) {
        moonText.html("The moon is currently a " + mType + ".");
        // moonText.style("transform","translateX(-5vw)");

    }
    else if (pos > (totalHeight - (window.innerHeight * 2)) && pos < totalHeight) {
        moonText.style("display", "none")
        archiveView.style("display", "block")
        // moonText.style("transform","translateX(0vw)");
    }
}
