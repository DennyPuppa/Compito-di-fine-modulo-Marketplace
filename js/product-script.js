const URL_ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/"
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAyZGJmNWU2MDQ3YjAwMTlmYTVmZjUiLCJpYXQiOjE3MTE0NjM0MTMsImV4cCI6MTcxMjY3MzAxM30.q3iUpG1cPeuDwgyVeeRB7lDLfRdPEMQsSL7OlkO1m0E"
const defautlHeaders = {
    "Authorization": key,
    "Content-type": "application/json",
}

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")
console.log(id);

abstractFetch(URL_ENDPOINT, {}).then(res => res.map(product => {
    if (product._id === id) {
        createCard(product)
    }
}))

const createCard = (product) => {
    const productContainer = document.querySelector("#product-container");

    productContainer.innerHTML += /*html*/`
    <div class="col-12 col-md-4 col-lg-3 p-0 card">
                        <img class="card-img-top" src="${product.imageUrl}" alt="Immagine del prodotto">
                        <div class="card-body">
                            <p class="card-text"><a href="./prodotto.html?id=${product._id}">${product.name}</a></p>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">${product.price}€</p>
                            <div class="d-flex justify-content-between">
                                <a class="btn btn-outline-primary" href="./backoffice.html?id=${product._id}">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <button class="btn btn-outline-danger" onclick="deleteProduct('${product._id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>   
                    </div>`
}

const deleteProduct = (id) => {
    if (!confirm("Sei sicuro di voler cancellare questo evento?")) return

    abstractFetch(URL_ENDPOINT + "/" + id, {method: "DELETE"}).then(() => {
        location.reload()
    })
}