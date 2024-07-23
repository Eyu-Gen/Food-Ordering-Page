const addtocartBoxes = document.getElementsByClassName("addtocartBox");
const productQuantities = document.getElementsByClassName("productQuantity");
const addtocart = document.getElementsByClassName("addtocart");
const minusBtns = document.getElementsByClassName("minusBtn");
const productUnits = document.getElementsByClassName("productUnits");
const itemName = document.getElementsByClassName("itemName");
const emptyCart = document.getElementById("emptyCart");
const orderingItems = document.getElementById("orderingItems");
const itemLists = document.getElementById("itemLists");

let clickedBtn = false;
for(let i = 0; i < addtocartBoxes.length; i++) {
    addtocartBoxes[i].addEventListener("click", () => {
        clickedBtn = true;
        if(clickedBtn) {
            addtocartBoxes[i].style.backgroundColor = "var(--redColor)";
            addtocartBoxes[i].style.borderColor = "var(--redColor)";
            productQuantities[i].style.display = "flex";
            addtocart[i].style.display = "none";
            emptyCart.style.display = "none";
            orderingItems.style.display = "block";
            let error = document.createElement("div");
            error.innerHTML = `<div></div>`; //Incomplete...
            itemLists.appendChild(error);
        }
    })
}

for(let i =0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", () => {
        let unitValue = Number(productUnits[i].value);
        unitValue++;
        alert(unitValue);
        // productUnits[i].innerHTML = unitValue;
    })
}