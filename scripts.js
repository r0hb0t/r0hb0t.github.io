//import * as fs from 'fs'; //Implement Node.JS

const header = `<div class="slideMenu">
        <input type="checkbox"><span class="toggleButton"><span class="menuIcon">.</span></span></input>

        <div class="slideContent">
            <a href="/index.html">Home</a>
            <a href="/projects.html">Projects</a>
            <a href="/resources.html">Resources</a>
            <a href="/recycling/">Recycling Identifier</a>
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
