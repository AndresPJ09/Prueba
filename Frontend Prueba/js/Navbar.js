function changeIframeSrc(filename) {
    showLoadingIndicator();
    setTimeout(function() {
        document.getElementById('contentFrame').src = filename;
    }, 500);  
}

function showLoadingIndicator() {
    document.getElementById('loadingIndicator').style.display = 'flex';
}

function hideLoadingIndicator() {
    setTimeout(function() {
        document.getElementById('loadingIndicator').style.display = 'none';
    }, 500); 
}
