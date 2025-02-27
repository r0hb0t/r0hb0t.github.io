//import * as fs from 'fs'; //Implement Node.JS

const header = `<div class="slideMenu">
        <input type="checkbox"><span class="toggleButton"><span class="menuIcon">.</span></span></input>

        <div class="slideContent">
            <a href="/index.html">Home</a>
            <a href="/doodles.html">To Be Done</a>
            <a href="/projects.html">Projects</a>
            <a href="/resources.html">Resources</a>
        </div>
    </div>
`;

const footer = `<div class="bottom">
	<p>All rights reserved. ©2025 Bozo Inc. Tech Solutions. In collaboration with the Institute of Knowledge, Washington D.C.</p>
</div>`;

const dropText = [`
<div class="dropText">
    <input type="checkbox"><span class="toggleButton"><p></p></span></input>
    <div class="dropTextHeader">
        <div class="dropTextTitle">
            <h2>`,
`           </h2>
        </div>
    </div>
    <div class="dropTextContent" id="`, `">`, `</div>
</div>`];

function insertHeader() {
    document.getElementsByTagName("header")[0].innerHTML = header;
    document.getElementsByTagName("footer")[0].innerHTML = footer;
}

function onLoad() {
    var root = document.querySelector(":root");
    var colors = [["8d66aa","ffddff"]]
    var ccolors = [["1f008f","ff5100"],["551100","55cc00"],["220066","ee9900"]];

    var randomColor = Math.round((Math.random() * (colors.length - 1)));

    root.style.setProperty('--s',"#"+colors[randomColor][0]);
    root.style.setProperty('--l',"#"+colors[randomColor][1]);
    //root.style.setProperty('--n',"#"+colors[randomColor][2]);
    
    var b1 = "";
    for (var i = 0; i < 6; i+=2) {
        b1 += Math.round(parseInt(colors[randomColor][0].substring(i,i+2),16) * 0.5).toString(16);
    }
    root.style.setProperty('--b1','#'+b1);
}

function loadDoodles() {
    alert(fs.readdirSync("/imgsrc").names[0]);
    for (var i=0;i<5;i++) {
        var names = ["Doodle #"+(i+1), "doodle"+(i+1)];
        document.getElementById("body").innerHTML += dropText[0] + names[0] + 
        dropText[1] + names[1] + dropText[2] + "<p>Woah this is the #"+(i+1)+" doodle!</p>" 
            + dropText[3];
    }
    document.line
}