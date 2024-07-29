const addTocart = document.getElementsByClassName("addtocart");
const productQuantity = document.getElementsByClassName("productQuantity");
const plusBtn = document.getElementsByClassName("plusBtn");
const minusBtns = document.getElementsByClassName("minusBtn");
const productUnits = document.getElementsByClassName("productUnits");
const itemLists = document.getElementById("itemLists");
const confirmItemList = document.getElementById("confirmItemList");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const blackBackground = document.getElementById("blackBackground");
const totalPrice = document.getElementById("totalPrice");
const finalTotalPrice = document.getElementById("finalTotalPrice");
const price = document.getElementsByClassName("price");
const emptyCart = document.getElementById("emptyCart");
const items = document.getElementById("items");
const orderingItems = document.getElementById("orderingItems");
let cartItemsArray = [];
let count;
let crossBtns = [];
let sum = 0;


// Event listener for "Add to Cart" buttons to update UI and cart state upon click...
for (let i = 0; i < addTocart.length; i++) {
    addTocart[i].addEventListener("click", () => {
        addTocart[i].style.display = "none";
        productQuantity[i].style.display = "flex";
        productUnits[i].textContent = "1";
        emptyCart.style.display = "none";
        orderingItems.style.display = "block";

        const itemId = addTocart[i].parentElement.nextElementSibling.getAttribute("id");
        cartItemsArray.push({
            itemId: itemId,
            count: 1
        });

        sum = 0;
        displayItems();
    })
}

// Event listeners for incrementing and decrementing product quantities in the cart
for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener("click", (e) => {
        e.stopPropagation();
        sum = 0;
        let unitValue = Number(productUnits[i].innerHTML);
        unitValue++;
        productUnits[i].innerHTML = unitValue;
        const elementId = plusBtn[i].parentElement.parentElement.nextElementSibling.getAttribute("id");
        const indexOfElement = cartItemsArray.findIndex(item => item.itemId === elementId);
        cartItemsArray[indexOfElement].count++;
        document.querySelector(`[data-id = ${cartItemsArray[indexOfElement].itemId}]`).querySelector(".selectedItemUnit").textContent = `${unitValue}x`;
        displayItems();
    })

    minusBtns[i].addEventListener("click", (e) => {
        e.stopPropagation();
        sum = 0;
        let unitValue = Number(productUnits[i].innerHTML);
        if (unitValue <= 1) {
            productQuantity[i].style.display = "none";
            addTocart[i].style.display = "flex";
        }
        else {
            unitValue--;
        }
        productUnits[i].innerHTML = unitValue;
        const elementId = plusBtn[i].parentElement.parentElement.nextElementSibling.getAttribute("id");
        const indexOfElement = cartItemsArray.findIndex(item => item.itemId === elementId);
        cartItemsArray[indexOfElement].count--;
        if(cartItemsArray[indexOfElement].count <= 0) {
            cartItemsArray = cartItemsArray.filter(item => item.itemId != cartItemsArray[indexOfElement].itemId);
            items.textContent = cartItemsArray.length;
            if (cartItemsArray.length <= 0) {
                emptyCart.style.display = "flex";
                orderingItems.style.display = "none";
            }
            displayItems()
        }
        document.querySelector(`[data-id = ${cartItemsArray[indexOfElement].itemId}]`).querySelector(".selectedItemUnit").textContent = `${unitValue}x`;
        displayItems();
    })
}

function displayItems() {
    itemLists.innerHTML = "";
    for (let i = 0; i < cartItemsArray.length; i++) {
        if (cartItemsArray[i].count < 1) {
            continue;
        }
        //Creating a container to display selected item name and price... main container
        const selectedItemBox = document.createElement("div");
        selectedItemBox.classList.add("selectedItemBox");
        selectedItemBox.classList.add("center");
        selectedItemBox.setAttribute("data-id", cartItemsArray[i].itemId);
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
        const item = document.getElementById(cartItemsArray[i].itemId).querySelector(".itemName");
        selectedItemName.textContent = item.textContent;
        selectedItemBoxRight.appendChild(selectedItemName);

        //Price...
        const selectedItemPriceContainer = document.createElement("div");
        selectedItemPriceContainer.classList.add("selectedItemPriceContainer");
        selectedItemPriceContainer.classList.add("center");
        //units displaying div...
        const selectedItemUnit = document.createElement("div");
        selectedItemUnit.classList.add("selectedItemUnit");
        selectedItemUnit.innerHTML = `${cartItemsArray[i].count}x`;
        selectedItemPriceContainer.appendChild(selectedItemUnit);
        //price per item displaying div...
        const selectedItemPricePerUnit = document.createElement("div");
        selectedItemPricePerUnit.classList.add("selectedItemPricePerUnit");
        selectedItemPricePerUnit.innerHTML = "@ $" + price[i].innerHTML;
        selectedItemPriceContainer.appendChild(selectedItemPricePerUnit);
        //total price of per unit displaying div...
        const selectedItemTotalPricePerUnit = document.createElement("div");
        selectedItemTotalPricePerUnit.classList.add("selectedItemTotalPricePerUnit");
        selectedItemTotalPricePerUnit.innerHTML = (Number(price[i].textContent) * Number(cartItemsArray[i].count)).toFixed(2);
        selectedItemPriceContainer.appendChild(selectedItemTotalPricePerUnit);
        selectedItemBoxRight.appendChild(selectedItemPriceContainer);

        //Left subcontainer
        const selectedItemBoxLeft = document.createElement("div");
        selectedItemBoxLeft.classList.add("selectedItemBoxLeft");
        selectedItemBoxLeft.classList.add("center");
        //Cross Btn
        const crossBtn = document.createElement("img");
        crossBtn.classList.add("crossBtn");
        crossBtn.src = "images/icon-remove-item.svg";
        selectedItemBoxLeft.appendChild(crossBtn);
        selectedItemBox.appendChild(selectedItemBoxLeft);

        items.textContent = cartItemsArray.length;
        let totalPricePerUnit = document.getElementsByClassName("selectedItemTotalPricePerUnit");
        sum += Number(totalPricePerUnit[i].textContent);
    }
    totalPrice.textContent = sum.toFixed(2);

    crossBtns = document.getElementsByClassName("crossBtn");

    for (let i = 0; i < crossBtns.length; i++) {
        crossBtns[i].addEventListener("click", () => {
            const proQty = document.querySelector(`[id = ${cartItemsArray[i].itemId}]`);
            proQty.previousElementSibling.querySelector(".productQuantity").style.display = "none";
            proQty.previousElementSibling.querySelector(".addtocart").style.display = "flex";
            cartItemsArray = cartItemsArray.filter(item => item.itemId != cartItemsArray[i].itemId);
            items.textContent = cartItemsArray.length;
            if (cartItemsArray.length <= 0) {
                emptyCart.style.display = "flex";
                orderingItems.style.display = "none";
            }

            displayItems()
        })
    }

}

//Confirm Order Container Displayed...
confirmOrderBtn.addEventListener("click", () => {
    blackBackground.style.display = "flex";

    confirmOrderList();
});

function confirmOrderList() {
    for(let i = 0; i < cartItemsArray.length; i++) {
        //Creating a container to display selected item name and price... main container
        const selectedItemBox = document.createElement("div");
        selectedItemBox.classList.add("selectedItemBox");
        selectedItemBox.classList.add("center");
        confirmItemList.appendChild(selectedItemBox);

        //Child of main container and parent of imageSection and right suncontainer div... Wrapper
        const selectedItemBoxRightWrapper = document.createElement("div");
        selectedItemBoxRightWrapper.classList.add("center", "selectedItemBoxRightWrapper");
        selectedItemBox.appendChild(selectedItemBoxRightWrapper);
        
        //Creating the imageSection div... child of wrapper
        const imageSection = document.createElement("div");
        imageSection.classList.add("imageSection", "center");
        imageSection.style.width = "70px";
        //Putting image... child of imageSection div
        const image = document.createElement("img");
        image.src = (document.getElementById(cartItemsArray[i].itemId)).previousElementSibling.querySelector("img").src;
        image.style.borderRadius = "10px"
        imageSection.appendChild(image);
        selectedItemBoxRightWrapper.appendChild(imageSection);

        //Right subcontainer... another child of wrapper
        const selectedItemBoxRight = document.createElement("div");
        selectedItemBoxRight.classList.add("selectedItemBoxRight");
        selectedItemBoxRightWrapper.appendChild(selectedItemBoxRight);

        //Creating childs of right subcontainer...
        //Title...
        const selectedItemName = document.createElement("p");
        selectedItemName.classList.add("selectedItemName");
        const item = document.getElementById(cartItemsArray[i].itemId).querySelector(".itemName");
        selectedItemName.textContent = item.textContent;
        selectedItemBoxRight.appendChild(selectedItemName);

        //Price container... parents of units and price per item containers
        const selectedItemPriceContainer = document.createElement("div");
        selectedItemPriceContainer.classList.add("selectedItemPriceContainer");
        selectedItemPriceContainer.classList.add("center");

        //units displaying div...
        const selectedItemUnit = document.createElement("div");
        selectedItemUnit.classList.add("selectedItemUnit", "center");
        selectedItemUnit.innerHTML = `${cartItemsArray[i].count}x`;
        selectedItemPriceContainer.appendChild(selectedItemUnit);

        //price per item displaying div...
        const selectedItemPricePerUnit = document.createElement("div");
        selectedItemPricePerUnit.classList.add("selectedItemPricePerUnit", "center");
        selectedItemPricePerUnit.innerHTML = "@ $" + price[i].innerHTML;
        selectedItemPriceContainer.appendChild(selectedItemPricePerUnit);
        
        selectedItemBoxRight.appendChild(selectedItemPriceContainer);

        
        //Left subcontainer... another child of main container
        const selectedItemBoxLeft = document.createElement("div");
        selectedItemBoxLeft.classList.add("selectedItemBoxLeft");
        selectedItemBoxLeft.classList.add("center");

        //total price of per unit displaying div... child of left Subcontainer
        const selectedItemTotalPricePerUnit = document.createElement("h2");
        selectedItemTotalPricePerUnit.classList.add("confirmSelectedItemTotalPricePerUnit");
        selectedItemTotalPricePerUnit.innerHTML = (Number(price[i].textContent) * Number(cartItemsArray[i].count)).toFixed(2);
        selectedItemBoxLeft.appendChild(selectedItemTotalPricePerUnit);
        
        selectedItemBox.appendChild(selectedItemBoxLeft);
    }

    finalTotalPrice.textContent = totalPrice.textContent; //Displaying total price
}

document.getElementById("finalOrderBtn").addEventListener("click", () => {location.reload();}) //refreshing page
