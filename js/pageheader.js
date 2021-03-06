function randomHexCode() {
    var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var code = []

    for (i = 0; i < 6; i++) {
        randomHex = hex[Math.floor(Math.random() * hex.length)];
        code.push(randomHex);
    }

    return code.reduce((a, b) => a + b, "");
}

// from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb and
// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion/9493060#9493060
function hexToHsl(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function getDarkerColor(hex1, hex2) {
    lightness1 = hexToHsl(hex1)[2];
    lightness2 = hexToHsl(hex2)[2];

    return lightness1 > lightness2 ? hex2 : hex1;
}

function getLighterColor(hex1, hex2) {
    lightness1 = hexToHsl(hex1)[2];
    lightness2 = hexToHsl(hex2)[2];

    return lightness1 > lightness2 ? hex1 : hex2;
}

function randomColors() {
    // get the random hex codes
    hexCode1 = randomHexCode();
    hexCode2 = randomHexCode();

    return [hexCode1, hexCode2];
}

function styleColors(hexCodes) {
    hexCode1 = hexCodes[0];
    hexCode2 = hexCodes[1];
    // edit the background image for the page header
    document.getElementById("page-header").style.backgroundImage = "linear-gradient(-90deg, #" + hexCode1 + ", #" + hexCode2 + ")";

    // get list of rules
    var rules = [];
    if (document.styleSheets[2].cssRules)
        rules = document.styleSheets[2].cssRules;
    else if (document.styleSheets[2].rules)
        rules = document.styleSheets[2].rules;

    // edit rule for headers
    rules[93].style.color = "#" + getLighterColor(hexCode1, hexCode2);
    rules[65].style.color = "#" + getDarkerColor(hexCode1, hexCode2);

    // save hex codes in cookie
    document.cookie = "hexCode1=" + hexCode1 + "; path=/";
    document.cookie = "hexCode2=" + hexCode2 + "; path=/";
}

function randomiseColors() {
    colors = randomColors();
    styleColors(colors);
}

// onload
var cookiesString = document.cookie
if (cookiesString != "") {
    cookiesArray = cookiesString.split(";");
    hexCode1 = cookiesArray[0].split("=")[1]
    hexCode2 = cookiesArray[1].split("=")[1]

    styleColors([hexCode1, hexCode2]);
} else {
    randomiseColors();
}
