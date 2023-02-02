const SERVER_URL = "http://127.0.0.1:8000";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function writePost(post){
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article`,{
        method: 'POST',
        body: post,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    let data = await response.json();
    return data;
}

async function submitPost(){
    let form = document.getElementById('form');
    let formData = new FormData(form);
    let result = await writePost(formData);
    console.log(result);
}
