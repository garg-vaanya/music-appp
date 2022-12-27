songStatus=  "";

rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
	song1 = loadSound("music.mp3");
	song2 = loadSound("the-beat-of-nature-122841.mp3")
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("darkgreen");
	stroke("lightgreen");

	song = song1.isPlaying();
	console.log("Song =" + song);
	if(scoreLeftWrist > 0.2 ) {
		circle(leftWristX, leftWristY, 20);
		song2.stop();

		if( song == false ) {
			if(leftWristX > 0 && leftWristY > 0) {
				song1.play();
				document.getElementById("song").innerHTML="Song Name: Harry Potter";
			}
		}
	} 

	song = song2.isPlaying();
	if(scoreRightWrist > 0.2 ) {
		circle(rightWristX, rightWristY, 20);
		song1.stop();

		if( song == false ) {
			if(rightWristX > 0 && rightWristY > 0) {
				song2.play();
				document.getElementById("song").innerHTML="Song Name: The Best Song Of Nature";				
			}
		}
	} 
}

function play()
{
	if(song == song1) 
	{
		song1.setVolume(0.5);
		song1.rate(1);
		song1.play();	
	}
	else 
	{
		song2.setVolume(0.5);
		song2.rate(1);
		song2.play();		
	}
}
