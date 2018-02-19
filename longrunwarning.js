const warningAmount = 10000;

var getTookResponseTooLong = (startTime, endTime) => {
    var diff = endTime - startTime;
    console.log(diff);
}

//handler function for contextCreated
var contextCreated = (context, next) => {

    //Make sure we only act on messages
    if(context.request.type === "message"){
        var startTime = new Date();
        console.log(startTime);

        return next().then(() => {
            var endTime = new Date();
            console.log(endTime);
            //Things to do when the request is through
            getTookResponseTooLong(startTime, endTime);
        });
    }
    else {
        return next();
    }

}

//Define export of module
module.exports = {
    contextCreated: contextCreated
}
