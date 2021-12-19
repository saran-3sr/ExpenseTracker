const balance=document.getElementById('balance');
const inbal=document.getElementById('in-balance');
const exbal=document.getElementById('ex-balance');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
let transactions=localStorage.getItem('transactions')!==null?localStorageTransactions:[];

  

function updatedata(e)
{
    e.preventDefault();
    if(text.value.trim()===''||amount.value.trim()==='')
    {
        alert("Please add number and text");
    }else
    {
        const transaction={
            id:generateID(),
            name:text.value,
            amount:amount.value
        };
        console.log(transaction.amount)
        transactions.push(transaction);
        addtransDom(transaction);
        updateLocalStorage()
        updateValues()
        
        text.value=" ";
        amount.value=" ";

    }
}

function generateID()
{
    return Math.random()*100000;
}

function addtransDom(transaction)
{
    const sign =transaction.amount< 0? '-':'+';
    const item =document.createElement('li');
    item.classList.add(transaction.amount<0?'minus':'plus');
    item.innerHTML=`<span class="namelistspan">${transaction.name}</span> <span class="listspan">${sign}${Math.abs(transaction.amount)}<i class="fas fa-trash deletebtn" onclick=removeTransaction(${transaction.id})></i></span>`;
    list.appendChild(item);
}

function updateValues(){
    const amount=transactions.map(transaction=>transaction.amount);
    console.log(amount)
    const total = (amount.reduce((acc, item) => (acc += item*1), 0)*1).toFixed(2);
    console.log(total)
    const income=amount
    .filter(item=>item>0)
    .reduce((acc,item)=>(acc+=item*1),0)

    const expense=(
        amount.filter(item=>item<0).reduce((acc,item)=>(acc+=item*1),0)*-1)
        balance.innerText=`$${total}`;
        inbal.innerText=`$${income}`;
        exbal.innerText=`$${expense}`;
}

function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id);
    updateLocalStorage();
    init();
}
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
function init(){
    list.innerHTML='';
    transactions.forEach(addtransDom);
    updateValues();
}
init();
form.addEventListener('submit',updatedata);