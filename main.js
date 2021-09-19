prediction1 = "";
prediction2 = "";

Webcam.set({
 Width: 350,
 Height: 300,
 Image_format: 'png',
 png_quality:1000 
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot() 
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src ="'+ data_uri +'"/>';
    })
}

console.log('ml5.version: ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iYBvpoRCA/model.json',modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');
}

function speak() 
{
    var synth = window.speechSynthesis;
    speak1 = "The First Prediction Is " + prediction1;
    speak2 = "The second Prediction Is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);

}

function predictgesture() 
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

function gotResult(error , results)
{
 if(error)
 {
     console.error(error);
 }
 else 
 {
     console.log(results);
     
     document.getElementById("result_gesture_name").innerHTML = results[0].label;
     document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak(); 
    if(results[0].label == "hand")
     { 
         document.getElementById("result_gesture").innerHTML = "&#9995;"; 
        }
    if(results[0].label == "all the best")
        { 
            document.getElementById("result_gesture").innerHTML = "&#128077;"; 
           }
     if(results[0].label == "amazing")
           { 
               document.getElementById("result_gesture").innerHTML = "&#128076;"; 
              }
    if(results[0].label == "victory")
              { 
                  document.getElementById("result_gesture").innerHTML = "&#9996;"; 
                 }
    if(results[0].label == "hand")
                 { 
                     document.getElementById("result_gesture2").innerHTML = "&#9995;"; 
                    }
    if(results[0].label == "all the best")
                { 
                     document.getElementById("result_gesture2").innerHTML = "&#128077;"; 
                    }
    if(results[0].label == "amazing")
               { 
                     document.getElementById("result_gesture2").innerHTML = "128076;"; 
                    }
    if(results[0].label == "victory")
               { 
                     document.getElementById("result_gesture2").innerHTML = "&#9996;"; 
                    }
 }
}