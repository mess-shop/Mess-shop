(function(){
    emailjs.init("Z7kuWQhsKGjCHrx4e"); // your public key
})();

let selectedSize = "";

// SIZE
document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", function(){
        document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        selectedSize = this.dataset.size;
    });
});

// ORDER BUTTON
document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", function(){

        if(!selectedSize){
            alert("Select size first");
            return;
        }

        document.getElementById("productName").value = this.dataset.product;
        document.getElementById("productSize").value = selectedSize;

        document.getElementById("order").scrollIntoView({behavior:"smooth"});
    });
});

// WHATSAPP
document.querySelectorAll(".whatsapp-btn").forEach(btn => {
    btn.addEventListener("click", function(e){
        e.preventDefault();

        if(!selectedSize){
            alert("Select size first");
            return;
        }

        let product = this.dataset.product;

        let url = `https://wa.me/212673991904?text=I want ${product} size ${selectedSize}`;

        window.open(url, "_blank");
    });
});

// FORM SUBMIT
document.getElementById("orderForm").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm(
        "service_2ikbrx5",
        "template_bukv4de",
        this
    ).then(() => {

        document.getElementById("successMessage").classList.add("active");
        this.reset();
        selectedSize = "";

    }, () => {
        alert("Error sending order");
    });

});

// NEW ORDER
document.getElementById("newOrderBtn").addEventListener("click", function(){
    document.getElementById("successMessage").classList.remove("active");
});
