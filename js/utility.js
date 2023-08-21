

function getProductPrice(price) {
    let parentchild = price.childNodes;
    let getPrice = stringToNumber(parentchild[3].childNodes[9].childNodes[0].innerText);
    let totalPrices = getValue('total-price');
    totalPrices = totalPrices + getPrice;
    // set total price
    setValue(totalPrices, 'total-price');

    // set Grand total price
    let grandTotals = getValue('grand-total');
    grandTotals = grandTotals + getPrice;

    setValue(grandTotals, 'grand-total');


    // button enable Or disable as per requirement
    if (totalPrices > 0) {
        const btn = document.getElementById('make-purchease');
        btn.disabled = false;
    } else {
        const btn = document.getElementById('make-purchease');
        btn.disabled = true;
    }
    if (totalPrices >= 200) {
        const btn = document.getElementById('coupon-btn');
        btn.disabled = false;
    } else {
        const btn = document.getElementById('coupon-btn');
        btn.disabled = true;
    }

    // add product name in a aside
    let productName = parentchild[3].childNodes[7].innerText;
    const addProduct = document.getElementById('list-item');
    const count = addProduct.childElementCount;
    const p = document.createElement('p');
    p.innerHTML = `${count + 1}. ${productName}`;
    addProduct.appendChild(p);
}



// dynamic formula
function stringToNumber(value) {
    const number = parseFloat(value);
    return number;

}

function getValue(value) {
    const getElement = document.getElementById(value);
    const getString = getElement.innerText;
    const getNumber = parseFloat(getString);
    return getNumber;
}

function setValue(value, id) {
    let setvalues = document.getElementById(id);
    setvalues.innerText = value.toFixed(2);

}


// coupon submit
function getDiscount() {
    const coupon = "SELL200";
    let totalPrices = getValue('total-price');
    const popupContainer = document.getElementById("popupContainer");
    const closePopupButton = document.getElementById("closePopupButton");
    const getElement = document.getElementById('coupon-input');
    const getCoupon = getElement.value;
    if (getCoupon == coupon) {
        let discountamount = (totalPrices * 20) / 100;
        setValue(discountamount, 'discount-price');
        totalPrices = totalPrices - discountamount;
        setValue(totalPrices, 'grand-total');

    } else {
        popupContainer.classList.remove("hidden");
    }
    closePopupButton.addEventListener("click", function () {
        popupContainer.classList.add("hidden");
    });
}

function resetCart (){

    let totalPrices = document.getElementById('total-price');
    totalPrices.innerText='00.00';
    let grandTotals = document.getElementById('grand-total');
    grandTotals.innerText='00.00';
    let discount = document.getElementById('discount-price');
    discount.innerText='00.00';
    const parentElement = document.getElementById("list-item");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }
      const btn = document.getElementById('make-purchease');
        btn.disabled = true;
        const couponBtn = document.getElementById('coupon-btn');
        couponBtn.disabled = true;
        const getElement = document.getElementById('coupon-input');
        getElement.value='';
    const my_modal_1 = document.getElementById("my_modal_1");
    my_modal_1.close();
}