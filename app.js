const addTocart = document.getElementsByClassName("addtocart");
const productQuantity = document.getElementsByClassName("productQuantity");
const plusBtn = document.getElementsByClassName("plusBtn");
const minusBtns = document.getElementsByClassName("minusBtn");
const productUnits = document.getElementsByClassName("productUnits");
const itemLists = document.getElementById("itemLists");
const price = document.getElementsByClassName("price");
const emptyCart = document.getElementById("emptyCart");
const orderingItems = document.getElementById("orderingItems");
const cartItemsArray = [];
let count;

for (let i = 0; i < addTocart.length; i++) {
    addTocart[i].addEventListener("click", () => {
        addTocart[i].style.display = "none";
        productQuantity[i].style.display = "flex";
        emptyCart.style.display = "none";
        orderingItems.style.display = "block";

        const itemId = addTocart[i].parentElement.nextElementSibling.getAttribute("id");
        cartItemsArray.push({
            itemId: itemId,
            count: 1
        });

        displayItems();
    })
}

for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener("click", (e) => {
        e.stopPropagation();
        let unitValue = Number(productUnits[i].innerHTML);
        unitValue++;
        productUnits[i].innerHTML = unitValue;
        cartItemsArray[i].count++;
        // console.log(cartItemsArray[i])
    })

    minusBtns[i].addEventListener("click", (e) => {
        e.stopPropagation();
        let unitValue = Number(productUnits[i].innerHTML);
        if (unitValue <= 1) {
            productQuantity[i].style.display = "none";
            addTocart[i].style.display = "flex";
        }
        else {
            unitValue--;
        }
        productUnits[i].innerHTML = unitValue;
    })
}

function displayItems() {
    for (let i = 0; i < cartItemsArray.length; i++) {
        // console.log(cartItemsArray);
        //Creating a container to display selected item name and price... main container
        const selectedItemBox = document.createElement("div");
        selectedItemBox.classList.add("selectedItemBox");
        selectedItemBox.classList.add("center");
        itemLists.appendChild(selectedItemBox);

        //Creating two subcontainer inside main container and using flex...
        //Right subcontainer
        const selectedItemBoxRight = document.createElement("div");
        selectedItemBoxRight.classList.add("selectedItemBoxRight");
        selectedItemBox.appendChild(selectedItemBoxRight);

        //Creating childs of right subcontainer...
        //Title...
        const selectedItemName = document.createElement("p");
        selectedItemName.classList.add("selectedItemName");
        const item = document.getElementById(cartItemsArray[i].itemId).querySelector(".itemName").textContent;
        selectedItemName.innerHTML = item;
        selectedItemBoxRight.appendChild(selectedItemName);

        //Price...
        const selectedItemPriceContainer = document.createElement("div");
        selectedItemPriceContainer.classList.add("selectedItemPriceContainer");
        selectedItemPriceContainer.classList.add("center");
        //units displaying div...
        const selectedItemUnit = document.createElement("div");
        selectedItemUnit.classList.add("selectedItemUnit");
        selectedItemUnit.innerHTML = `${count}x`; //ERROR... count is not being ++ when plus btn is clicked...
        selectedItemPriceContainer.appendChild(selectedItemUnit);
        //price per item displaying div...
        const selectedItemPricePerUnit = document.createElement("div");
        selectedItemPricePerUnit.classList.add("selectedItemPricePerUnit");
        selectedItemPricePerUnit.innerHTML = "@ $" + price[i].innerHTML;
        selectedItemPriceContainer.appendChild(selectedItemPricePerUnit);
        //total price of per unit displaying div...
        const selectedItemTotalPricePerUnit = document.createElement("div");
        selectedItemTotalPricePerUnit.classList.add("selectedItemTotalPricePerUnit");
        selectedItemTotalPricePerUnit.innerHTML = "$" + (Number(price[i].innerHTML) * count).toFixed(2);
        selectedItemPriceContainer.appendChild(selectedItemTotalPricePerUnit);
        selectedItemBoxRight.appendChild(selectedItemPriceContainer);

        //Left subcontainer
        const selectedItemBoxLeft = document.createElement("div");
        selectedItemBoxLeft.classList.add("selectedItemBoxLeft");
        selectedItemBoxLeft.classList.add("center");
        selectedItemBox.appendChild(selectedItemBoxLeft);
    }
}