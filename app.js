const addtocartBoxes = document.getElementsByClassName("addtocartBox");
const productQuantities = document.getElementsByClassName("productQuantity");
const addtocart = document.getElementsByClassName("addtocart");
const minusBtns = document.getElementsByClassName("minusBtn");
const plusBtn = document.getElementsByClassName("plusBtn");
const productUnits = document.getElementsByClassName("productUnits");
const itemName = document.getElementsByClassName("itemName");
const price = document.getElementsByClassName("price");
const emptyCart = document.getElementById("emptyCart");
const orderingItems = document.getElementById("orderingItems");
const itemLists = document.getElementById("itemLists");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");

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

            //Creating a container to display selected item name and price... main container
            const selectedItemBox = document.createElement("div");
            selectedItemBox.classList.add("selectedItemBox");
            selectedItemBox.classList.add("center");
            itemLists.appendChild(selectedItemBox);

            //Creating two subcontainer inside main container and using flex...
            //Right subcontainer
            const selectedItemBoxRight = document.createElement("div");
            selectedItemBoxRight.classList.add("selectedItemBoxRight");
            selectedItemBoxRight.classList.add("center");
            selectedItemBox.appendChild(selectedItemBoxRight);

            //Creating childs of right subcontainer...
            //Title...
            const selectedItemName = document.createElement("p");
            selectedItemName.classList.add("selectedItemName");
            selectedItemName.innerHTML = itemName[i].innerHTML;
            selectedItemBoxRight.appendChild(selectedItemName);
            
            //Price...
            const selectedItemPriceContainer = document.createElement("div");
            selectedItemPriceContainer.classList.add("selectedItemPriceContainer");
            selectedItemPriceContainer.classList.add("center");
            //units displaying div...
            const selectedItemUnit = document.createElement("div");
            selectedItemUnit.innerHTML = `1x`;
            selectedItemPriceContainer.appendChild(selectedItemUnit);
            //price per item displaying div...
            const selectedItemPricePerUnit = document.createElement("div");
            selectedItemPricePerUnit.innerHTML = "@" + price[i].innerHTML;
            selectedItemPriceContainer.appendChild(selectedItemPricePerUnit);
            //total price of per unit displaying div...
            const selectedItemTotalPricePerUnit = document.createElement("div");
            selectedItemTotalPricePerUnit.innerHTML = Number(price[i].innerHTML) * (i+1); //price X unit ERROR... 
            selectedItemPriceContainer.appendChild(selectedItemTotalPricePerUnit);
            selectedItemBoxRight.appendChild(selectedItemPriceContainer);
            


            //Left subcontainer
            const selectedItemBoxLeft = document.createElement("div");
            selectedItemBoxLeft.classList.add("selectedItemBoxLeft");
            selectedItemBoxLeft.classList.add("center");
            selectedItemBox.appendChild(selectedItemBoxLeft);
        }
    })
}

for(let i =0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener("click", () => {
        let unitValue = Number(productUnits[i].innerHTML);
        unitValue++;
        productUnits[i].innerHTML = unitValue;
    })
    
    minusBtns[i].addEventListener("click", () => {
        let unitValue = Number(productUnits[i].innerHTML);
        if(unitValue === 0) {
            addtocart[i].display = "flex";
            productQuantities[i].display = "none";
        }
        unitValue--;
        productUnits[i].innerHTML = unitValue;
    })
}