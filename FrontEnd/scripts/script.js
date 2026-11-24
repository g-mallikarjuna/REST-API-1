//fetching users data
async function fetchData(){
    const response = await fetch('/api/users');
    const data = await response.json();
    const userNames = data.map((user)=>{
        return `<div class="container">
            <h5>${user.name}</h5>
            <button class="edit-btns" data-id1="${user.id}">Edit</button>
            <button class="delete-btns" data-id2="${user.id}">Delete</button>
        </div>`
    })

    document.querySelector('.show-details').innerHTML = userNames.join(" ");
    //edit button to change names
    const editBtn = document.querySelectorAll('.edit-btns');
    editBtn.forEach((button)=>{
        button.addEventListener('click', ()=>{
            updateData(button.dataset.id1);
        })
    })

    //delete button to delete user
    const deleteBtn = document.querySelectorAll('.delete-btns');
    deleteBtn.forEach((button)=>{
        button.addEventListener('click', ()=>{
            deleteUser(button.dataset.id2);
        })
    })
}

//Using POST Method we are updating user details
document.getElementById('submitBtn').addEventListener('click', async(e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const occupation = document.getElementById('occupation').value;
    await fetch('/api/users/login/user',
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, age: age ,occupation: occupation})
        }
    )

    //fetching use data again to update the DOM
    fetchData();

})

//updating user name with PUT Method
async function updateData(id){
    const name = window.prompt("Enter a name");
    if(!name){
        return alert("Enter a valid name!");
    }
    await fetch(`/api/users/${id}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name})
        }
    )
    //fetching use data again to update the DOM
    fetchData();
}

//removing user using DELETE Method
async function deleteUser(id){

    await fetch(`/api/users/${id}`,
        {
            method: "DELETE",
        }
    )
    //fetching use data again to update the DOM
    fetchData();
}

//insitial run
fetchData();

