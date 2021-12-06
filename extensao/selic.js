function getSelic(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/selic", true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            chrome.browserAction.setBadgeText({text: `${xhr.responseText}`})
            chrome.browserAction.setTitle({title: `A Selic hoje está em ${xhr.responseText}`})
        } else {
            chrome.browserAction.setBadgeText({text: `N/A`})
        }
    }
    xhr.send()
}

getSelic()

setInterval(getSelic, 300000)

chrome.browserAction.setBadgeBackgroundColor({color: '#5c5704'})

chrome.browserAction.onClicked.addListener(function(){
        window.open('http://localhost:3000/')
    } 
)