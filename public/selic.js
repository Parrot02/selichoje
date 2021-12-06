valor = document.querySelector('#taxa')

function getSelic(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/selic", true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            taxa.innerHTML = `<strong>${xhr.responseText}</strong>`
        } else {
        }
    }
    xhr.send()
}

getSelic()