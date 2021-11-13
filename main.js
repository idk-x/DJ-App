Webcam.set({
    width:350,
    height:300,
    image_format:'png'
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;


function preload()
{
    song = loadSound("music_mp3");
}


function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is initialized")
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = result[0].pose.leftWrist.x
        leftWristY = result[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + "leftWristY = "+ leftWristY)

        rightWristX = result[0].pose.rightWrist.x
        rightWristY = result[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY)
    }
}


function draw() {
    image(video, 0, 0, 600, 500);
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
