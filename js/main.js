document.getElementById('myForm').addEventListener("submit", saveBookmark);

function validateBookmark(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
        alert('test');
    }
    //validate url
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','gi');
    
    if(!siteUrl.match(pattern)) {
        alert('Please fill a valid url');
        return false;
    }
}

function saveBookmark(e) {
    

    var siteName = document.getElementById("site-name").value;
    var siteUrl = document.getElementById("url").value;

    validateBookmark(siteName, siteUrl);

    var bookmark = {
        name : siteName,
        url: siteUrl
    }

    
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       // console.log();
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    fetchBookmarks();

    e.preventDefault();
}
function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].url == url) { 
            bookmarks.splice(i,1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log(bookmarks);
   

    var html = '';
    for(var i=0; i<bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        html += `
            <div class="well">
            <h3>${name}
            <a href="${url}" target="_blank" class="btn btn-default">Visit</a>
            <a class="btn btn-danger" onclick="deleteBookmark('${url}')">delete</a>
            </h3>
            </div>   
            `;
    }

    document.getElementById('bookmarks-result').innerHTML = html;

}

