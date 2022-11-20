url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Philadelphia?unitGroup=us&include=days&key=W2MX5BG5NHFHC2LEP84U38X7F&contentType=json";
let data;
let weather;
let moonPhase;
let moonText;
let mType;
let mapMoon;
let archiver;
let moonImgs;
let sw = true;

function setup() {
    loadJSON(url, gotData);
    archiver = select(".archiveView");
    archiver.mousePressed(changeView);
}

function gotData(data) {
    // print(data);
    weather = data;
    moonPhase = weather.days[0].moonphase;
    print(moonPhase);
    mType = (getMoon(moonPhase));
    moonText = select(".staticText");
    moonText.removeClass("introMover");
    moonText.removeClass("introSpin");
    moonText.html("The moon overhead is currently a " + mType + ".");
    moonImgs = selectAll('img');
    if (moonPhase >= 0 && moonPhase <= .5) {
        mapMoon = map(moonPhase, 0, .5, -400, 0)
    } else if (moonPhase >= .51 && moonPhase <= 1) {
        mapMoon = map(moonPhase, .5, 1, 0, 400)
    }
    print(mapMoon);
    for (i = 0; i < moonImgs.length; i++) {
        // moonImgs[i].style("opacity", moonPhase);
        moonImgs[i].style("object-position", mapMoon + "px" + " 0");
        moonImgs[i].style("marginRight", Math.floor(random(-400, 50)) + "px");
        moonImgs[i].style("marginBottom", Math.floor(random(-400, 50)) + "px");
    }
}

function changeView() {
    if (sw == true) {
        for (i = 0; i < moonImgs.length; i++) {

            moonImgs[i].style("object-position", "0" + " 0");
            moonImgs[i].style("marginRight", "0px");
            moonImgs[i].style("marginBottom", "0px");
            moonImgs[i].addClass("archive");
        }
        sw = false;
    } else {
        for (i = 0; i < moonImgs.length; i++) {
            moonImgs[i].style("object-position", mapMoon + "px" + " 0");
            moonImgs[i].style("marginRight", Math.floor(random(-400, 50)) + "px");
            moonImgs[i].style("marginBottom", Math.floor(random(-400, 50)) + "px");
            moonImgs[i].removeClass("archive");
        }
        sw = true;
    }
    print(sw);
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
    } else if (m == 0) {
        return "New Moon";
    } else if (m == .25) {
        return "First Quarter";
    } else if (m == .5) {
        return "Full Moon";
    } else if (m == .75) {
        return "Last Quarter";
    }
}