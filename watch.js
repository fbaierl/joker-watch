

var bodySelection = d3.select("#watch");

var svgSelection = bodySelection.append("svg")
    .style("background", "beige")
    .attr("width", "100%")
    .attr("height", "100%")

const defs = svgSelection.append("defs")    

const eyeGradient = defs.append('radialGradient')
    .attr("id", "eyeGradient")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%")
    .attr("fx", "50%")
    .attr("fy", "50%")    

eyeGradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "white")

eyeGradient.append("stop")
    .attr("offset", "55%")
    .style("stop-color", "white")
    
eyeGradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#777777")

var handData = [{
    hour: 0,
    minute: 0,
    second: 0
}]
    
const bezelRadius = 500
const bezelStrokeWidth = 70
const eyeRadius = 305 / 2
const eyeStrokeWidth = 49
const pupilRadius = 22

const eyeStrokeColor = "black"

// main bezel circle                                
svgSelection.append("circle")
    .attr("cx", bezelRadius + (bezelStrokeWidth / 2))
    .attr("cy", bezelRadius + (bezelStrokeWidth / 2))
    .attr("r", bezelRadius - 0* (bezelStrokeWidth / 2))
    .style("fill", "white")
    .style("stroke", "black")
    .style("stroke-width", bezelStrokeWidth)                             

const eyes = svgSelection.append("g")    
    .attr("transform", "translate(0, 400)")
    .data(handData)
    // .enter()

// TODO animate pupils
const pupilTranslateY = -1 * ((eyeRadius - eyeStrokeWidth) - pupilRadius - 7)

function hourPupilTranslateRotation(hour) {
    const rotate = hour * 30
    return "rotate(" + rotate + ", 0, " + -1 * pupilTranslateY + ")"
} 

function minutePupilTranslateRotation(minute) {
    const rotate = minute * 6
    return "rotate(" + rotate + ", 0, " + -1 * pupilTranslateY + ")"
} 


    

// left eye
const leftEyeTransformX = 145 + 0.5*eyeStrokeWidth + eyeRadius
const leftEye = eyes.append("g")
    .attr("transform", "translate(" + leftEyeTransformX + ")", 0)

leftEye.append("circle")
    .attr("r", eyeRadius - 0.5*eyeStrokeWidth)
    .style("stroke", eyeStrokeColor)
    .style("stroke-width", eyeStrokeWidth)    
    .style("fill", "url(#eyeGradient)")

leftEye.append("circle")   
    .attr("id", "leftPupil") 
    .attr("r", pupilRadius)
    
leftEye.append("image")
    .attr("xlink:href", "img/12.png")
    .attr("y", - (eyeRadius - eyeStrokeWidth / 2 + 16) )
    .attr("x", - 20)
    .attr("height", "30px")

leftEye.append("image")
    .attr("xlink:href", "img/3.png")
    .attr("transform", "translate(" + (eyeRadius - eyeStrokeWidth / 2 + 14) + ", -15) rotate(90)")
    .attr("height", "30px")    
    
leftEye.append("image")
    .attr("xlink:href", "img/6.png")
    .attr("y", (eyeRadius - eyeStrokeWidth / 2 - 12) )
    .attr("x", -12)
    .attr("height", "30px")
       
leftEye.append("image")
    .attr("xlink:href", "img/9.png")
    .attr("transform", "translate(" + -1 * (eyeRadius - eyeStrokeWidth / 2 + 14) + ", 10) rotate(-90)")
    .attr("height", "30px")      

// right eye 
const rightEyeTransformX = 549 + 0.5*eyeStrokeWidth + eyeRadius
const rightEye = eyes.append("g")
.attr("transform", "translate(" + rightEyeTransformX + ")", 0)

rightEye.append("circle")
    .attr("r", eyeRadius - 0.5*eyeStrokeWidth)
    .style("stroke", eyeStrokeColor)
    .style("stroke-width", eyeStrokeWidth)    
    .style("fill", "url(#eyeGradient)")

rightEye.append("circle")  
    .attr("id", "rightPupil")
    .attr("r", pupilRadius)

rightEye.append("image")
    .attr("xlink:href", "img/60.png")
    .attr("y", - (eyeRadius - eyeStrokeWidth / 2 + 16) )
    .attr("x", - 24)
    .attr("height", "30px")

rightEye.append("image")
    .attr("xlink:href", "img/15.png")
    .attr("transform", "translate(" + (eyeRadius - eyeStrokeWidth / 2 + 14) + ", -20) rotate(90)")
    .attr("height", "30px")    
    
rightEye.append("image")
    .attr("xlink:href", "img/30.png")
    .attr("y", (eyeRadius - eyeStrokeWidth / 2 - 15) )
    .attr("x", -28)
    .attr("height", "30px")
       
rightEye.append("image")
    .attr("xlink:href", "img/45.png")
    .attr("transform", "translate(" + -1 * (eyeRadius - eyeStrokeWidth / 2 + 14) + ", 30) rotate(-90)")
    .attr("height", "30px")         


function updateHands(){
    var t = new Date();
    handData.hour = (t.getHours() % 12) + t.getMinutes() / 60 // adding minutes for smooth movement
    handData.minute = t.getMinutes() + t.getSeconds() / 60 // adding seconds for smooth movement
    handData.second = t.getSeconds()

    eyes.select("#leftPupil")
        .attr("transform", "translate(0, " + pupilTranslateY + ") " + hourPupilTranslateRotation(handData.hour))

    eyes.select("#rightPupil")
        .attr("transform", "translate(0, " + pupilTranslateY + ") " + minutePupilTranslateRotation(handData.minute)) 

}

// const update = eyes.update()
    
// TODO update

updateHands()

setInterval(function(){
    updateHands()
}, 1000);
