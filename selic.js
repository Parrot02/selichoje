let taxa = document.querySelector('#taxa')

function getSelic(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/selic", true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            var jason = JSON.parse(xhr.responseText)
            var selic = jason[jason.length-1].valor 
            taxa.innerHTML = `<strong>${selic}pp</strong>`
        } else {
            taxa.innerHTML = `<strong>Erro!</strong>`
        }
    }
    xhr.send()
}

getSelic()
