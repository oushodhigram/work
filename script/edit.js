
function addHyphens() {
    // Get the content from the editor
    var editorContent = document.getElementById("editor").textContent;
    
    // Split the content into words
    var words = editorContent.split(" ");
    
    // Join the words with hyphens
    var hyphenatedText = words.join("-");
    
    // Display the hyphenated text
    document.getElementById("result").textContent = hyphenatedText;
}

function saveContent() {
    // Get the content from the editor
    var editorContent = document.getElementById("editor").textContent;
    
    // Create a Blob containing the content
    var blob = new Blob([editorContent], { type: 'text/plain' });
    
    // Create a temporary URL for the Blob
    var url = window.URL.createObjectURL(blob);
    
    // Create a link for downloading
    var a = document.createElement('a');
    a.href = url;
    a.download = 'text_file.txt'; // Set the filename here
    a.style.display = 'none';
    
    // Trigger a click event to download the file
    document.body.appendChild(a);
    a.click();
    
    // Clean up the temporary URL and link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function loadContent() {
    // Retrieve the content from local storage
    var savedContent = localStorage.getItem("editorContent");
    
    // Display the retrieved content in the editor
    document.getElementById("editor").textContent = savedContent;
}

function openFile() {
    // Trigger the file input element to open the file dialog
    document.getElementById("fileInput").click();
}

// Handle file selection
document.getElementById("fileInput").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileContent = e.target.result;
            document.getElementById("editor").textContent = fileContent;
        };
        reader.readAsText(file);
    }
});

// Format selected text as a heading (H1 to H6)
function formatHeading(headingTag) {
    var selection = window.getSelection();
    var selectedText = selection.toString();
    var formattedText = "<" + headingTag + ">" + selectedText + "</" + headingTag + ">";
    document.execCommand("insertHTML", false, formattedText);
}

// Toggle bold style for selected text
function toggleBold() {
    document.execCommand("bold", false, null);
}

// Show the link popup
function showLinkPopup() {
    var linkPopup = document.getElementById("linkPopup");
    linkPopup.style.display = "flex";
}

// Hide the link popup
function hideLinkPopup() {
    var linkPopup = document.getElementById("linkPopup");
    linkPopup.style.display = "none";
}

// Insert a link with the specified URL, text, and target
function insertLink() {
    var linkURL = document.getElementById("linkURL").value;
    var linkText = document.getElementById("linkText").value;
    var linkTarget = document.getElementById("linkTarget").value;

    var linkHTML = '<a href="' + linkURL + '" target="' + linkTarget + '">' + linkText + '</a>';
    document.execCommand("insertHTML", false, linkHTML);

    // Hide the link popup after inserting the link
    hideLinkPopup();
}

// Show the table popup
function showTablePopup() {
    var tablePopup = document.getElementById("tablePopup");
    tablePopup.style.display = "flex";
}

// Hide the table popup
function hideTablePopup() {
    var tablePopup = document.getElementById("tablePopup");
    tablePopup.style.display = "none";
}

// Insert a table with the specified number of rows and columns
function insertTable() {
    var tableRows = document.getElementById("tableRows").value;
    var tableColumns = document.getElementById("tableColumns").value;

    // Create the table HTML
    var tableHTML = "<table border='1'>";
    for (var i = 0; i < tableRows; i++) {
        tableHTML += "<tr>";
        for (var j = 0; j < tableColumns; j++) {
            tableHTML += "<td></td>";
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";

    // Create a range and insert the table
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(document.getElementById("editor"));
    range.collapse(false);
    var tableFragment = range.createContextualFragment(tableHTML);
    selection.removeAllRanges();
    document.getElementById("editor").appendChild(tableFragment);
    
    // Hide the table popup after inserting the table
    hideTablePopup();
}
