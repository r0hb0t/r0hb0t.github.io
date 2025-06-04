function getInput() {
    sessionStorage.setItem("input",inputField.value);
    window.location.assign("results.html");
}

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        getInput();
    }
});

const submit = document.querySelector("a");
submit.addEventListener("click",getInput);