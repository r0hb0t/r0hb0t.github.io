let header = `<div class="slideMenu">
        <input type="checkbox"><span class="toggleButton"><p>.</p></span></input>

        <div class="slideContent">
            <a href="index.html">Home</a>
            <!--<a href="about.html">About</a>-->
            <a href="projects.html">Projects</a>
            <a href="resources.html">Resources</a>
            <a href="index-old.html">[OLD] Home</a>
            <a href="projects-old.html">[OLD] Projects</a>
        </div>
    </div>
`;
document.getElementById("header").innerHTML = header;

function onLoad() {
    var root = document.querySelector(":root");
    var colors = [["1f008f","ff5100"],["551100","55cc00"],["220066","ee9900"]];
    
    var randomColor = Math.round((Math.random() * (colors.length - 1)));
    
    root.style.setProperty('--shadow',"#"+colors[randomColor][0]);
    root.style.setProperty('--light',"#"+colors[randomColor][1]);
}