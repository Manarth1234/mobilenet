function preload() {

}
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',ModelLoaded);
}
function ModelLoaded() {
  console.log("Model is Loaded!");
}
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video,gotResults);
}
var previous_result = '';
function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    if(results[0].label > 0.5 && previous_result != results[0].label) {
      console.log(results);
      previous_result = results[0].label;

      document.getElementById("result_object").innerHTML = "Object: " + results[0].label;
      document.getElementById("accuracy").innerHTML = "Accuracy: " + results[0].confidence;
    }
  }
}


