chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);
    if (request.message === "activate") {
        chrome.pageAction.show(sender.tab.id);
    }
    else if (request.message === "inactivate") {
        chrome.pageAction.hide(sender.tab.id);
    }
});