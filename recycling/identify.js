//https://en.wikipedia.org/wiki/Recycling_codes
var num=0;
var labels = [ //0.25 -- requires special disposal to recycle,
                //0.75 -- likely recyclable, 
                //0.5 -- cannot be trashed or recycled, REQUIRES special disposal,
                //0.6 -- check locally
                //0.9 -- compost
    [1,"PETE","polyethylene terephthalate", 1],
    [1,"PET","polyethylene terephthalate", 1],
    [2,"HDPE","high-density polyethylene", 1],
    [2, "PEHD", "high-density polyethylene", 1],
    [3, "PVC", "polyvinyl chloride", 0.25],
    [4, "LDPE", "low-density polyethylene", 0.25],
    [4, "PELD", "low-density polyethylene", 0.25],
    [5, "PP", "polypropylene", 0.25],
    [6, "PS", "polystyrene", 0.25],
    [7, "O", "other" , 0.25],
    [-1, "ABS", "acrylonitrile butadiene styrene", 1],
    [-1, "PA", "polyamide (nylon)", 0.25],

    [8, "Lead", "a lead-acid battery", 1],
    [9, "Alkaline", "an alkaline battery", 0.25],
    [10, "NiCD", "a nickel-cadmium battery", 0.5],
    [11, "NiMH", "a nickel-metal hydride battery", 0.25],
    [12, "Li", "a lithium battery", 0.25],
    [13, "SO", "a silver-oxide battery", 0.25],
    [13, "SOZ", "a silver-oxide battery", 0.25],
    [14, "CZ", "a zinc-carbon battery", 0.25]
    
    [20, "PAP", "cardboard", 1],
    [21, "PAP", "paperboard", 1],
    [22, "PAP", "paper", 1],

    [40, "FE", "steel", 1],
    [41, "ALU", "aluminum", 1],

    [50, "FOR", "wood", 0.25],
    [51, "FOR", "cork", 0.25],
    [60, "COT", "cotton", 0.25],
    [61, "TEX", "jute", 0.25],
    [62, "TEX", "some textile", 0.25],
    [63, "TEX", "some textile", 0.25],
    [64, "TEX", "some textile", 0.25],
    [65, "TEX", "some textile", 0.25],
    [66, "TEX", "some textile", 0.25],
    [67, "TEX", "some textile", 0.25],
    [68, "TEX", "some textile", 0.25],
    [69, "TEX", "some textile", 0.25],

    [70, "GL", "clear glass", 1],
    [71, "GL", "green glass", 1],
    [72, "GL", "brown glass", 1],
    [73, "GL", "dark sort glass", 1],
    [74, "GL", "light sort glass", 1],
    [75, "GL", "light leaded glass", 0.5],
    [76, "GL", "leaded glass", 0.5],
    [77, "GL", "copper-backed glass", 0.25],
    [78, "GL", "silver-backed glass", 0.25],
    [79, "GL", "gold-backed glass", 0.25],

    [80, "", "paper composite", 1],
    [81, "PAPPET", "paper and plastic", 1],
    [82, "", "paper, fiberboard and aluminum", 1],
    [83, "", "paper, fiberboard and tinplate", 1],
    [84, "C/PAP", "paper, cardboard, plastic, and aluminum", 1],
    [85, "", "paper, fiberboard, plastic, aluminum, and tinplate", 1],
    [87, "CSL", "biodrgradable plastic", 0.9],
    [90, "C/LDPE", "plastics and aluminum", 0.25],
    [91, "C/LDPE", "plastic and tinplate", 0.25],
    [92, "", "plastic and miscellaneous metals", 1],
    [95, "", "glass and plastic", 1],
    [96, "", "glass and aluminum", 1],
    [97, "", "glass and tinplate", 1],
    [98, "", "glass and miscellaneous metals", 1],
    [99, "", "other composite materials", 0.6]
];
function displayResults() {
    const input = sessionStorage.getItem("input");
    let info = null;
    
    for (const i of labels) {
        if (input == i[0] || input == i[1]) {
            info = i;
            break;
        }
    }
    if (info[0] < 10) {
        if (info[0] < 0) {
            info[0] = info[1];
            info[1] = "";
        }
        else {
            info[0] = "0" + info[0];
        }
    }

    document.querySelector(".number").innerText = info[0];
    document.querySelector(".letters").innerText = info[1];
    
    info[2] = info[2].substring(0,1).toUpperCase() + info[2].substring(1) + ".";
    document.querySelector(".name").innerText = info[2];

    const icon = document.querySelector("#recycleIcon");
    switch (info[3]) {
        case 0:
            info[3] = "To the trash!";
            icon.src = "imgsrc/not recyclable.png";
            break;
        case 0.25:
            info[3] = "Has specialized recycling!";
            icon.src = "imgsrc/recyclable.png";
            break;
        case 0.5:
            info[3] = "Requires special disposal!";
            icon.src = "imgsrc/not recyclable.png";
            break;
        case 0.6:
            info[3] = "Check with local recyclers.";
            icon.src = "imgsrc/not recyclable.png";
            break;
        case 0.75:
            info[3] = "Likely recyclable!";
            icon.src = "imgsrc/recyclable.png";
            break;
        case 0.9:
            info[3] = "Compost it!";
            icon.src = "imgsrc/recyclable.png";
            break;
        case 1:
            info[3] = "Recycle it!";
            icon.src = "imgsrc/recyclable.png";
            break;
    }
    document.head.innerHTML += "<link rel=\"icon\" type=\"image/x-icon\" href=" + icon.src + "/>";
    document.querySelector("#recycleDesc").innerText = info[3];
}