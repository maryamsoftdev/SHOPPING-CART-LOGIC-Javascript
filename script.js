const output = document.createElement('div');
document.body.appendChild(output);
const output1 = document.createElement('div');
document.body.appendChild(output1);
const itemInput1 = document.createElement('input');
itemInput1.setAttribute('type', 'text');
itemInput1.setAttribute('placeholder', 'item name');
output.appendChild(itemInput1);
const itemInput2 = document.createElement('input');
itemInput2.setAttribute('type', 'number');
itemInput2.setAttribute('placeholder', 'cost');
output.appendChild(itemInput2);
const itemButton = document.createElement('button');
itemButton.textContent = "Add Item";
itemButton.addEventListener('click', addItem);
output.appendChild(itemButton);
const outButton = document.createElement('button');
outButton.textContent = "Total";
outButton.addEventListener('click', function () {
    let temp = cart.totalCost();
    console.log(temp);
});
output.appendChild(outButton);
const items = [];
const cart = new Cart();
window.onload = function () {
    itemInput1.value = "Milk";
    itemInput2.value = 5;
    addItem();
}
 
function Cart() {
    const myList = {};
    this.lister = function () {
        console.log(myList);
    }
    this.totalCost = function () {
        let total = 0;
        for (let pro in myList) {
            let subtotal = myList[pro].subtotal();
            total += subtotal;
        }
        return total;
    }
    this.output = function () {
        let total = 0;
        output1.innerHTML = "";
        for (let pro in myList) {
            let subtotal = myList[pro].subtotal();
            let el = myList[pro];
            output1.innerHTML += `${el.name} $${el.price} X ${el.qty} = $${subtotal}<br>`;
            total += subtotal;
        }
        output1.innerHTML += `<b>Final Total $${total}</b>`;
    }
    this.adder = function (item, cost) {
        let namer = item.toLowerCase();
        if (!myList[namer]) {
            myList[namer] = {
                name: item
                , price: cost
                , qty: 1
                , subtotal: function () {
                    return this.price * this.qty
                }
            }
        }
        else {
            myList[namer].qty++;
        }
    }
}
 
function Item(name, cost) {
    this.name = name;
    this.cost = cost;
    this.withTax = function () {
        return (this.cost * 1.15).toFixed(2);
    }
    this.shipping = function () {
        return (this.cost * 1.05).toFixed(2);
    }
}
 
function addItem() {
    let tempName = itemInput1.value || "test1";
    let tempValue = itemInput2.value || 1;
    let tempItem = new Item(tempName, tempValue);
    items.push(tempItem);
    console.log(items);
    let div = document.createElement('div');
    div.innerHTML = `<h3>${tempName}</h3>$${tempValue}`;
    div.style.border = "1px solid #ddd";
    div.style.display = "inline-block";
    div.style.width = "100px";
    div.addEventListener('click', function () {
        cart.adder(tempName, tempValue);
        cart.output();
    });
    div.tempName = tempName;
    div.tempValue = tempValue;
    document.body.appendChild(div);
    itemInput1.value = "";
    itemInput2.value = "";
}