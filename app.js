const addtocartBoxes = document.getElementsByClassName("addtocartBox");
const productQuantities = document.getElementsByClassName("productQuantity");
const addtocart = document.getElementsByClassName("addtocart");
let clickedBtn = false;
for(let i = 0; i < addtocartBoxes.length; i++) {
    addtocartBoxes[i].addEventListener("click", () => {
        clickedBtn = true;
        if(clickedBtn) {
            addtocartBoxes[i].style.backgroundColor = "var(--redColor)";
            addtocartBoxes[i].style.borderColor = "var(--redColor)";
            productQuantities[i].style.display = "flex";
            addtocart[i].style.display = "none";
        }
    })
}

