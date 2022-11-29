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

    tx = xoff

    if (tx <= windowWidth / 2) {
        // mapMoon = int(map(moonPhase, 0, .5, (-1 * moonImageSize), 0));
        mx = int(map(tx, 0, windowWidth / 2, -moonImageSize, moonImageSize))
    } else if (tx >= windowWidth / 2) {
        // mapMoon = int(map(moonPhase, .5, 1, 0, moonImageSize));
        mx = int(map(tx, windowWidth / 2, windowWidth, moonImageSize, moonImageSize * 2))
    }
    // print(moonImgs);


    for (i = 0; i < moonImgs.length; i++) {
        moonImgs[i].style("object-position", mapMoon + mx + "px" + " 0");
        // moonImgs[i].style("marginBottom", Math.floor(noise(xoff) * 500) + "px");

    }
    xoff = xoff + 5;
    if (xoff >= windowWidth + moonImageSize / 2) {
        xoff = 0;
    }
}

//MAKE AN OBJECT DUDE





// function switchClass() {
//     let delayInMilliseconds = 5000;

//     setTimeout(function () {
//         moonText.removeClass("animateOn");
//         moonText.addClass("animateOff");
//     }, delayInMilliseconds);
// }


// let ogState = true;
// function detectChange(x) {

//     //initialize
//     if (ogState) {
//         oldState = x;
//         ogState = false;
//     }

//     if (oldState == x) {
//         //no change
//         return false;
//     } else {
//         oldState = x;
//         //changed
//         return true;
//     }
// }



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


function gotData(data) {
    // print(data);
    weather = data;
    moonPhase = weather.days[0].moonphase;
    print(moonPhase);
    mType = (getMoon(moonPhase));

    moonImgs = selectAll('img');

    checkMoonSize()

    for (i = 0; i < moonImgs.length; i++) {
        // moonImgs[i].style("opacity", moonPhase);

        moonImgs[i].style("marginRight", Math.floor(random(minRando, maxRando)) + "px");
        moonImgs[i].style("marginBottom", Math.floor(random(minRando, maxRando)) + "px");
        moonImgs[i].style("object-position", mapMoon + "px" + " 0");
        moonImgs[i].style("opacity", ".8");

        // if (i == moonImgs.length - 1) {
        //     makeVisible = true;
        //     print("make visible now")
        // }
        // if (makeVisible) {
        //     for (i = 0; i < moonImgs.length; i++) {

        //         print("change opacity and margin")
        //     }
        // }
    }


}

function checkMoonSize() {
    print("the window size is: " + window.innerWidth)
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
        mapMoon = int(map(moonPhase, 0, .5, (-1 * moonImageSize), 0));
        print("towards full moon")
    } else if (moonPhase >= .51 && moonPhase <= 1) {
        mapMoon = int(map(moonPhase, .5, 1, 0, moonImageSize));
        print("towards new moon")
    }
    print(maxRando, minRando, moonImageSize, mapMoon);
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
            // moonImgs[i].style(random(chooseMargin), Math.floor(random(minRando, maxRando)) + "px");
            // moonImgs[i].style("marginBottom", Math.floor(random(minRando, maxRando)) + "px");
            moonImgs[i].removeClass("archive");
        }
        sw = true;
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


class MoonImage {

    constructor() {
        // this.mx = random(width);
        
    }


    show() {
        checkMoonSize();
        this.style("marginRight", Math.floor(random(minRando, maxRando)) + "px");
        this.style("marginBottom", Math.floor(random(minRando, maxRando)) + "px");
        this.style("object-position", 0 + "px" + " 0");
        this.style("opacity", ".8");

    }

    move(mover){
        this.style("object-position", mover + "px" + " 0");

    }

}


