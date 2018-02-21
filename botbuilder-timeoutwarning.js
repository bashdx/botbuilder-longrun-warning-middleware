//set default value for timeout threshold
var _timeoutThreshold = 10000; //ms
var _timeoutWarningCallback = undefined;

//helper function - compare passed time with threshold value
var getTookResponseTooLong = (startTime, endTime) => {
    var diff = endTime - startTime;
    if(diff >= _timeoutThreshold)
        return true;
    return false;
}

//handler function for contextCreated
var contextCreated = (context, next) => {

    //Make sure we only act on messages
    if(context.request.type === "message"){
        var startTime = new Date();
        console.log(startTime);

        return next().then(() => {
            var endTime = new Date();
            
            //Things to do when the request is through
            if(getTookResponseTooLong(startTime, endTime)){
                //maybe add duration of call
                _timeoutWarningCallback(context);
            }
        });
    }
    else {
        return next();
    }
}

//Define export of module
//Parameters:
//
//timeoutWarningCallback 
// - required
// - timeoutWarningCallback(context: BotContext): void
// - defines what to do if replying to activity takes longer then defined via timeoutThreshold
//
//timeoutThreshold
// - optional
// - timeoutThreshold: number
// - defines the value (in ms) when the timeoutWarningCallback should be called
module.exports = (timeoutWarningCallback, timeoutThreshold) => {

    if(timeoutThreshold && timeoutThreshold > 0){
        _timeoutThreshold = timeoutThreshold;
        console.log(timeoutThreshold);
    }

    if(!timeoutWarningCallback || typeof timeoutWarningCallback !== "function"){
        //maybe define default callback - for now throw error
        throw Error("timeoutWarningCallback must be defined and must be a function!");
    }
    
    _timeoutWarningCallback = timeoutWarningCallback;
    
    return { contextCreated: contextCreated };
}
