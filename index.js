/*

ChooseExpenseAmount
Choose Description
Choose a Catagory (DDL)

*/

function handleFormSubmit(event) {  
    event.preventDefault();

    const expense = event.target.expense.value;
    const Description = event.target.Description.value;
    const Catagory = event.target.Catagory.value;

    const userDetails = {
        expense,
        Description,
        Catagory,
    };

    const userList = JSON.parse(localStorage.getItem('usersList')) || [];

    const editId = sessionStorage.getItem("editId");
    if (editId) {
        update(editId, userDetails, userList);
    }
    else {
        add(userDetails, userList);
    }
    localStorage.setItem('usersList', JSON.stringify(userList));
    }

    document.addEventListener("DOMContentLoaded", initialize);


function initialize() {
        
        const userList = JSON.parse(localStorage.getItem("usersList")) || [];
        for (let i = 0; i < userList.length; i++){
            display(userList[i]);
        }
    }

    function display(data) {
    
        const ul = document.querySelector('ul');

        const li = document.createElement('li');

        li.textContent = `${data.id}, ${data.expense}, ${data.Description}. ${data.Catagory}`;

        li.id = data.id;
        ul.appendChild(li);

        const button = document.createElement('button');
        button.textContent = 'Delete';

        button.addEventListener('click', () => deleteData(data.id, li));

        const editButton = document.createElement('button');
        li.appendChild(button);
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => editData(data, li));

        li.appendChild(editButton);
            
}

function add(userDetails, userList) {
    userDetails.id = Date.now();
    userList.push(userDetails);
    display(userDetails);
    }

     

    function deleteData(id, li) {
        const userList = JSON.parse(localStorage.getItem('usersList')); 

        const updatedUserList = [];

        for (let user1 of userList) {
            if (user1.id != id) {
                updatedUserList.push(user1);
            }
        }

        localStorage.setItem('usersList',JSON.stringify(updatedUserList)); 
        li.remove();

    }

    function editData(data, li) {

        const expense = document.querySelector('#expense');
        const Description = document.querySelector('#Description');
        const Catagory = document.querySelector('#Catagory');

        expense.value = data.expense;
        Description.value = data.Description;
        Catagory.value = data.Catagory;

        sessionStorage.setItem("editId", data.id);

    }

function update(editId, userDetails, userList) {
    for (let i = 0; i < userList.length; i++){
        if (userList[i].id == editId) {
            userList[i].expense = userDetails.expense;
            userList[i].Description = userDetails.Description;
            userList[i].Catagory = userDetails.Catagory;
            break;
        }
    }

    const li = document.getElementById(editId);
    li.firstChild.textContent = Object.values(userDetails).join(" ");
    sessionStorage.removeItem("editId");
}
    module.exports = handleFormSubmit