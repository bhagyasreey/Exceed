// Function for Text to Voice Announcement
    function makeAnnouncement() {
        const text = document.getElementById('announcementText').value.trim();
        if (text === "") {
            alert("Please enter text to announce.");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    }

    // Function for Image to Text
    function processImageToText() {
        const imageInput = document.getElementById('imageInput');
        const extractedTextElem = document.getElementById('extractedText');

        if (!imageInput.files || imageInput.files.length === 0) {
            alert("Please select an image file.");
            return;
        }

        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            const imageData = reader.result;

            // Using Tesseract.js for OCR
            Tesseract.recognize(imageData, 'eng', {
                logger: info => console.log(info) // Logs progress in the console
            }).then(({ data: { text } }) => {
                extractedTextElem.innerText = text.trim() || "No text detected in the image.";
            }).catch(error => {
                console.error(error);
                extractedTextElem.innerText = "Error: Unable to process the image.";
            });
        };

        reader.readAsDataURL(file);
    }

    // Function to display sections
    function showSection(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Function for Voice to Text
    function startVoiceRecognition() {
        const voiceOutputElem = document.getElementById('voiceOutput');

        // Check browser support for SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceOutputElem.innerText = "Speech recognition is not supported in your browser.";
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false; // Only return final results
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onstart = function () {
            voiceOutputElem.innerText = "Listening...";
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            voiceOutputElem.innerText = `Recognized Text: ${transcript}`;
        };

        recognition.onerror = function (event) {
            voiceOutputElem.innerText = `Error: ${event.error}`;
        };
    }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addCloseButton(myNodelist[i]);
}

// Function to add a close button to a list item
function addCloseButton(item) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    item.appendChild(span);

    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

// Click on a close button to hide the current list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    addCloseButton(li);
}
