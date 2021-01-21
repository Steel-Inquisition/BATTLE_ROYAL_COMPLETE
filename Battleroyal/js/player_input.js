// THIS IS NOT MY CODE, THIS IS TAKEN FROM https://www.thecodehubs.com/generate-text-file-using-plain-javascript/

function generateTxtFile(text) {
    var textFile = null;
    var data = new Blob([text], {
        type: 'text/plain'
    });
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
}
(function () {
    var btnCreateFile = document.getElementById('btnCreateFile');
    btnCreateFile.addEventListener('click', function () {
        var link = document.getElementById('downloadFile');
        link.href = generateTxtFile(save);
        link.style.display = 'inline-block';
    }, false);
})();

// Read file inserted by player
function readFile(fileInput) {

    let files = fileInput.files;

    // Fetch Content from nickname.txt
    fetch(`text/${files[0].name}`).then(convertData).then(processData);

    function convertData(rawData) {
        return rawData.text();
    }

    function processData(stringData) {
        log = stringData.split(/\r?\n/);
        console.log(log);
    }
}