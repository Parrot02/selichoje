function getSelic(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json", true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            var jason = JSON.parse(xhr.responseText)
            var selic = jason[jason.length-1].valor 
            chrome.browserAction.setBadgeText({text: `${selic}`})
            chrome.browserAction.setTitle({title: `A Selic hoje está em ${selic}pp`})
        } else {
            chrome.browserAction.setBadgeText({text: `${selic}`})
        }
    }
    xhr.send()
}

getSelic()

setInterval(getSelic, 300000)

chrome.browserAction.setBadgeBackgroundColor({color: 'black'})

chrome.browserAction.onClicked.addListener(function(){
        window.open('https://fat-info.herokuapp.com')
    } 
)