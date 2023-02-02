const SERVER_URL = "http://127.0.0.1:8000";

async function postCate(category){
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // credentials: 'include'
    })
    let data = response.json();
    return data;
}

async function submitCategory(){
    let category = {
        name: document.getElementById('cate').value
    }
    let result = await postCate(category)
    // let form = document.getElementById('form');
    // let formData = new FormData(form);
    // let result = await postCate(formData);
    console.log(result); 
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}