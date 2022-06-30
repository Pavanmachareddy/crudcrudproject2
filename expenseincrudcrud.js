const myForm = document.querySelector('#my-form');
const Eamount = document.querySelector('#Expenseamount');
const Edescription = document.querySelector('#description');
const Ecategory = document.querySelector('#Category');
const msg = document.querySelector('.msg');
const ExpenseList = document.querySelector('#listOfExpense');
myForm.addEventListener('submit', onSubmit);


function onSubmit(e) {
    e.preventDefault();

    const ExpenseDetails = {
        Eamount: Eamount.value,
        Edescription: Edescription.value,
        Ecategory: Ecategory.value
    }
    //storing data on the cloud
    axios.post("https://crudcrud.com/api/6e05916f8b11416cbb2edc1e01857e76/ExpData", ExpenseDetails)
        .then((response) => {
            showExpenseOnScreen(response.data)
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/6e05916f8b11416cbb2edc1e01857e76/ExpData")
        .then((response) => {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                showExpenseOnScreen(response.data[i])
            }
        }).catch((err) => {
            console.log(err);
        })
})
function showExpenseOnScreen(Expense) {
    console.log(Expense)
    if (localStorage.getItem(Expense.Eamount) !== null) {
        removeExpenseFromTheScreen(Expense.Eamount)
    }
    const parentNode = document.getElementById('listOfExpense');
    const childHTML = `<li id="${Expense._id}" > ${Expense.Eamount} -  ${Expense.Edescription} -${Expense.Ecategory}
            <button  onclick=removeExpense('${Expense._id}')>Delete Expense</button>                    
            <button onclick=editExpense('${Expense.Eamount}','${Expense.Edescription}','${Expense.Ecategory}','${Expense._id}')> Edit Expense</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function removeExpense(ExpenseId) {
    axios.delete(`https://crudcrud.com/api/6e05916f8b11416cbb2edc1e01857e76/ExpData/${ExpenseId}`)
        .then((response) => {
            removeExpenseFromTheScreen(ExpenseId)
        })
        .catch((err) => {
            console.log(err);
        })
}
function editExpense(Eamount, Edescription, Ecategory,ExpenseId) {
    document.getElementById('Expenseamount').value = Eamount
    document.getElementById('description').value = Edescription
    document.getElementById('Category').value = Ecategory
    removeExpense(ExpenseId)
     removeExpenseFromTheScreen(ExpenseId)
}
function removeExpenseFromTheScreen(ExpenseId) {
    const parentNode = document.getElementById('listOfExpense');
    const childNodeToBeDeleted = document.getElementById(ExpenseId)
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
