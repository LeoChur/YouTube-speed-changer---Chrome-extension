const defaultsettings = {
  min: 0,
  max: 5,
  step: 0.1 
}

var playbackSlider = document.getElementById("playbackSlider");
var currentSpeed = document.getElementById("currentSpeed");
var settings = document.getElementById("settings");
ubdateSliderSetting();

 chrome.tabs.getSelected(undefined, (tab) => {
   chrome.tabs.sendMessage(tab.id, { message: "get playback speed"});
 });

 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message == "current speed") {
      playbackSlider.value = message.speed;
      showSpeed(playbackSlider.value );
  }
});



function showSpeed(speed) {
  currentSpeed.innerHTML = speed.toString();
}

function updatePlaybackSpeed(speed) {
  chrome.tabs.getSelected(undefined, (tab) => {
    chrome.tabs.sendMessage(tab.id, { message: "set playback speed", speed: speed });
  });
}

function ubdateSliderSetting(){
  chrome.storage.local.get(['min'], function(result){
    playbackSlider.min = result["min"] || 0;
  });
  chrome.storage.local.get(['max'], function(result){
    playbackSlider.max = result["max"] || 5;
  });
  chrome.storage.local.get(['step'], function(result){
    playbackSlider.step =  parseFloat( result["step"] || 0.2);
  });

}


settings.addEventListener("click",
  function() {
    // var a = document.getElementById("getsettings").innerHTML;
    // console.log(typeof(a));
    // console.log(document.getElementById("getsettings").innerHTML !=  " ");
    // console.log("a is" + a +"sss")
    if(document.getElementById("getsettings").innerHTML !=  " "){
      document.getElementById("getsettings").innerHTML = " ";
      location.reload();
      return;
    }
    
    document.getElementById("getsettings").innerHTML =
          '<input type="text" placeholder=" min, now: ' + playbackSlider.min  + '" id="min"  class="txt" value="">>'
      +   '<input type="text" placeholder=" max, now: ' + playbackSlider.max  + '" id="max"  class="txt" value="">>'
      +   '<input type="text" placeholder=" step, now:' + playbackSlider.step + '" id="step" class="txt" value="">>'
      +   '<input type="button" value="Set" id = "set"  class="btn">'
      +   '<input type="button" value ="Back" id="back" class="btn">';

    
      
    document.getElementById("set").addEventListener("click", function(){
      // console.log("click");
      // var b = document.getElementById('min') .value
      //alert("click");
      // playbackSlider.min  = document.getElementById('min' ).value;
      // playbackSlider.max  = document.getElementById('max' ).value;
      // playbackSlider.step = document.getElementById('step').value;
    //  console.log(typeof(b));
    //  console.log("a" + b + "a");
    //  console.log(b);
    //  console.log(b == "");
    //  console.log(b != ""
      if(document.getElementById('min').value != ""){
        chrome.storage.local.set({min:  document.getElementById('min') .value});
      }
      if(document.getElementById('max').value != "")
        chrome.storage.local.set({max:  document.getElementById('max') .value});
      if(document.getElementById('step').value != "")
        chrome.storage.local.set({step: document.getElementById('step').value});
      ubdateSliderSetting();
      document.getElementById("getsettings").innerHTML = " ";
      location.reload();
    })
    // playbackSlider.step
    document.getElementById("back").onclick = function(){
      document.getElementById("getsettings").innerHTML = " ";
      location.reload();
    }
  }  
)

playbackSlider.addEventListener("input", () => {
  console.log(playbackSlider.value);
  showSpeed(playbackSlider.value);
  updatePlaybackSpeed(playbackSlider.value);
})



