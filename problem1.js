fs = require('fs');
// const parser = require('xml2json');
// console.log(__dirname);
// const file = fs.readFileSync(__dirname + '/Problem.gpx');
// const json = parser.toJson(file);
 const jsonCoordiantes = require('./out.json');

//Problem A TotalDistance
function calculateTotalDistance(lat1, lon1, lat2 ,lon2) {
    // const lat1 = "13.1935950";
    // const lon1 =  "77.6491150";
    // const lat2 = "12.9444110";
    // const lon2 =  "77.5962460";
    const R = 6371;
	const dLat = (lat2-lat1) * Math.PI / 180;
    const dLon = (lon2-lon1) * Math.PI / 180;
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
	if (d>1) return `${Math.round(d)} km`;
    else if (d<=1) return `${Math.round(d*1000)} m`;
}

// calculateTotalDistance("13.1935950", "77.6491150", "12.9444110", "77.5962460")

//problem C Average Speed
function calculateAverageSpeed () {
    let distance = calculateTotalDistance();
    distance = distance.includes('km') ? parseInt(distance) * 1000 : parseInt(distance);
    let time1 = new Date("2016-12-11T00:37:52Z").getTime();
    let time2 = new Date("2016-12-11T05:41:50Z").getTime();
    const totaltime = (time2 - time1)/1000; //in seconds
    let speed = distance/totaltime;
    console.log(speed.toFixed(2) + 'm/s');
    return speed.toFixed(2) + ' m/s';
}
//call this fn
// calculateAverageSpeed() 

//problem (D) elevation gained 

function elevationGained() {
    const elevationArr = jsonCoordiantes.trkpt.map(a => parseFloat(a.ele));
    const minElevation = Math.min(...elevationArr);
    const maxElavation = Math.max(...elevationArr);
    console.log('minimum Elevation', minElevation, 'maximum Elevation', maxElavation);
    return {minElevation, maxElavation};
}
//  call this fn
//elevationGained();

// problem (F) total Time elapsed
function totaltime () {
    let time1 = new Date("2016-12-11T00:37:52Z").getTime();
    let time2 = new Date("2016-12-11T05:41:50Z").getTime();
    const totaltime = (time2 - time1)/1000; //in seconds
    return totaltime + ' seconds';
}

//totaltime();

//problem B Max speed
function maxSpeed(){
    let speedArr = [];
    let mainArr = jsonCoordiantes.trkpt;
    console.log('start');
    for (let i =0; i< mainArr.length - 1 ;i++) {
        let lat1, lat2, lon1, lon2, time1, time2 ;
        for(let j = i+1; j< mainArr.length ; j++) {
             lat1 = mainArr[i].lat;
             lat2 = mainArr[j].lat;
             lon1 = mainArr[i].lon;
             lon2 = mainArr[j].lon;
             time1 = new Date(mainArr[i].time).getTime();
             time2 = new Date(mainArr[j].time).getTime();
        }
        let distance = calculateTotalDistance(lat1, lon1, lat2, lon2);
        distance = distance.includes('km') ? parseInt(distance) * 1000 : parseInt(distance);
        let totaltime = (time2 - time1)/1000; //in seconds
        let speed = distance/totaltime;
        speedArr.push(speed);
    }
    console.log('end');
    const maxSpeed = Math.max(...speedArr) + ' m/s';
    console.log('maxSpeed' , maxSpeed);
    return maxSpeed;
}
// call this fn below the answer is 5.1532 m/s
// maxSpeed(); 