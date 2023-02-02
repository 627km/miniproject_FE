const SERVER_URL = 'http://127.0.0.1:8000'

async function getPost(id){
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
}

async function insertPost(id){
    let data = await getPost(id)
    let title = document.getElementById('title');
    let content = document.getElementById('content');
    let category = document.getElementById('category');
    let image = document.getElementById('image');

    title.value = data.title;
    content.value = data.content;
    category.value = data.category;
    image.value = data.image;

    // title.parentElement.id = id;
}



async function updatePost(post, id){
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json',
        },
    })
    let data = await response.json();
    return data;
}

async function submitPost(event) {
    let id = event.target.previousElementSibling.id;
    post = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value
    }
    console.log(article);
    let result = await updatePost(post, id);
    console.log(result);
}
