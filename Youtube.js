var video;


function send(){
    console.log("send")
    if(location.href.indexOf("/watch") == -1){
        chrome.runtime.sendMessage({ message: "inactivate"});
        console.log("send inactivate")
    }
    else{
        chrome.runtime.sendMessage({ message: "activate"});
        console.log("send activate")

        video = document.getElementsByTagName("video")[0];
        console.log(video.playbackRate);
    }
}

{
    var lastURL;
    var a = document.getElementsByClassName("ytp-ad-preview-container countdown-next-to-thumbnail");
    var t = document.getElementsByClassName("ytp-ad-skip-button ytp-button");

    var b = document.getElementsByClassName("ytp-ad-overlay-close-button");

    var c = document.getElementsByClassName("ytp-ad-text ytp-ad-preview-text");

    function checkURL() {
        //console.log("check " + location.href);
        if (location.href != lastURL) {
            console.log("!=");
            send();
            lastURL = location.href;
        }
    }
    
    function check(){
        //console.log("ccccc");
        if(a.length !=0){
            console.log("skipedvideo");
            video.playbackRate = 5.0;
            if(t.length != 0){
                console.log("skip");
                t[0].click();
            }
        }
        if(b.length != 0){
            console.log("banner closed");
            b[2].click();
        }
        if(c.length != 0){
            //console.log("notskiped video");
            video.playbackRate = 5.0;
        }
    }

    setInterval(check,1000);
    setInterval(checkURL, 2000);
    checkURL();
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message == "set playback speed") {
        video.playbackRate = message.speed;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message == "set playback speed") {
        video.playbackRate = message.speed;
    }
    if(message.message == "get playback speed"){
        chrome.runtime.sendMessage({ message: "current speed", speed: video.playbackRate })
    }
});