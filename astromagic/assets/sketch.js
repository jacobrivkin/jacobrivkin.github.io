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

function setup() {

    loadJSON(url, gotData);
    archiver = select(".archiveView");
    archiver.mousePressed(changeView);
}

function draw() {
    scrollPos = window.scrollY
    scrollHeight = document.body.clientHeight;
    // print("The scroll height  is: "+ scrollHeight);
    // print("The scroll position is: " + scrollPos);
    scrollMoon(scrollPos, scrollHeight);
    // print(window.innerHeight);

}




// function switchClass() {
//     let delayInMilliseconds = 5000;

//     setTimeout(function () {
//         moonText.removeClass("animateOn");
//         moonText.addClass("animateOff");
//     }, delayInMilliseconds);
// }


let ogState = true;
function detectChange(x) {
    if (ogState) {
        oldState = x;
        ogState = false;
    }

    if (oldState == x) {
   
    } else {
       oldState = x;
        
    }
}

function scrollMoon(pos, totalHeight) {
    moonText = select(".staticText");
    archiveView = select(".archiveView");
    centerText = select(".centerText");
    moonText.removeClass("introMover");
    moonText.removeClass("introSpin");
    let tx = moonText.html()
    // detectChange(tx);

    pos = int(pos);
    if (pos > 0 && pos < totalHeight * .1) {
        moonText.html("↓");
  
    }
    else if (pos > totalHeight * .1 && pos < totalHeight * .2) {
        moonText.html("The");
        // moonText.style("transform","translateX(-45vw)");

    }
    else if (pos > totalHeight * .2 && pos < totalHeight * .3) {
        moonText.html("The moon");
        // moonText.style("transform","translateX(-40vw)");
    }
    else if (pos > totalHeight * .3 && pos < totalHeight * .4) {
        moonText.html("The moon is");
        // moonText.style("transform","translateX(-35vw)");

    }
    else if (pos > totalHeight * .4 && pos < totalHeight * .5) {
        moonText.html("The moon is getting");
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
        moonText.style("display","none")
        archiveView.style("display","block")
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
            // moonImgs[i].style("marginRight", "0px");
            // moonImgs[i].style("marginLeft", "0px");
            // moonImgs[i].style("marginBottom", "0px");
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