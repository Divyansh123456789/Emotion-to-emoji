
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dT5S9_u7G/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechsynthessis;
    data_1 = "The First Prediction is " + Prediction1;
    data_2 = "And the second Prediction is " + Prediction2;
    var UtterThis = new SpeechSynthesisUtterance(data_1 + data_2);
    UtterThis.rate = 0.5;
    synth.speak(UtterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();

        if (results[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (results[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }




        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }



    }
}