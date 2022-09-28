const form = document.getElementById('form');
const submit = ()=> {
    const data = new FormData(form);
    for(let [key, value] of data)
    {
        console.log({key, value})
    }
}
