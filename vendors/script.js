let addButtons = document.querySelectorAll(".btn.add");
let removeButtons = document.querySelectorAll(".btn.remove");
let cart=[];
addButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let serviceItem= btn.parentElement;
    let serviceName= serviceItem.dataset.name;
    let servicePrice= parseFloat(serviceItem.dataset.price);
    cart.push({serviceName, servicePrice})
    console.log(cart)
    btn.style.display = "none"; // hide add
    btn.nextElementSibling.style.display = "inline-block"; // show remove

    
  });
});

removeButtons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        btn.style.display= "none";
        btn.previousElementSibling.style.display= "inline-block";
    })
})


