const URL_ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/"
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAyZGJmNWU2MDQ3YjAwMTlmYTVmZjUiLCJpYXQiOjE3MTE0NjM0MTMsImV4cCI6MTcxMjY3MzAxM30.q3iUpG1cPeuDwgyVeeRB7lDLfRdPEMQsSL7OlkO1m0E"


const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")
console.log(id);
const isEdit = !!id

const addBtn = document.querySelector("#add-product-btn")

window.onload = async () => {
    if (!id) return

    document.querySelector("h1").textContent = "Edit Product"

    abstractFetch(URL_ENDPOINT + `/${id}`).then(res => patchFormValues(res))

}

const patchFormValues = (product) => {
    document.querySelector("#name").value = product.name
    document.querySelector("#desc").value = product.description
    document.querySelector("#price").value = product.price
    document.querySelector("#imageUrl").value = product.imageUrl
    document.querySelector("#brand").value = product.brand
}

const getFormValues = () => {
    const form = document.getElementById('add-product-form');
    const formData = new FormData(form);
    const values = {};
  
    formData.forEach((value, key) => {
      if (key === 'price') {
        values[key] = +value;
      } else {
        values[key] = value;
      }
    });
  
    console.log(values);
    return values;
  }

const showUserMessage = (message) =>{
    const userMessage = document.querySelector("#user-message");
    userMessage.classList.remove("d-none");
    userMessage.innerHTML = message;
}
  

addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (!id) {
        const body = getFormValues()
        console.log("fetch post");
        abstractFetch(URL_ENDPOINT, { method: "POST", body}).then(res => console.log(res))
        showUserMessage("Prodotto creato, torna alla Home per visualizzarlo")
    } else {
        const body = getFormValues()
        console.log(getFormValues());
        abstractFetch(URL_ENDPOINT + `/${id}`, {method : "PUT", body}).then(console.log("PRODOTTO AGGIORNATO"))
        showUserMessage("Prodotto aggiornato, torna alla Home per visualizzarlo")
    }
})