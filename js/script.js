const URL_ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/"
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAyZGJmNWU2MDQ3YjAwMTlmYTVmZjUiLCJpYXQiOjE3MTE0NjM0MTMsImV4cCI6MTcxMjY3MzAxM30.q3iUpG1cPeuDwgyVeeRB7lDLfRdPEMQsSL7OlkO1m0E"

const defautlHeaders = {
    "Authorization": key,
    "Content-type": "application/json",
}

const obj = {
    name: "prova",
    description: "ciao",
    brand: "apple",
    imageUrl: "https://picsum.photos/200",
    price: 5,
}

const hideSpinner = () => {
    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-none");
}
const showSpinner = () => {
    const spinner = document.querySelector("#spinner");
    spinner.classList.remove("d-none");
}

const abstractFetch = async (url, options = {}) => {

    const requestOptions = {
        method: options.method || "GET",
        headers: { ...defautlHeaders, ...options.headers },
        ...options
    }
    requestOptions.method === "GET"
        ? showSpinner()
        : null

    requestOptions.body
        ? requestOptions.body = JSON.stringify(options.body)
        : null
    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
            throw new Error(`${options.method} Response from fetch not ok`)
        }
        return await response.json()
    } catch (error) {
        console.error(error);
        throw error
    } finally {
        hideSpinner()
    }
}

const searchField = () => {
    const inputField = document.querySelector("#search-field")

    abstractFetch(URL_ENDPOINT, {}).then(res => res.filter((product) => {
        if (product.name.toLowerCase().includes(inputField.value.toLowerCase())) {
            const cardContainer = document.querySelector("#card-container");
            cardContainer.innerHTML = "";
            createCard(product)
        } else {
            const cardContainer = document.querySelector("#card-container");
            cardContainer.innerHTML = /*html*/`
            <p class="mx-auto"> Nessun prodotto corrsipondente alla tua ricerca</p>`;
        }
    }))
}


const createCard = (product) => {
    const cardContainer = document.querySelector("#card-container");

    cardContainer.innerHTML += /*html*/`
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

abstractFetch(URL_ENDPOINT, {}).then(res => {
    console.log(res);
    res.map(product => createCard(product))
}
)

const deleteProduct = (id) => {
    if (!confirm("Sei sicuro di voler cancellare questo evento?")) return

    abstractFetch(URL_ENDPOINT + "/" + id, {method: "DELETE"}).then(() => {
        location.reload()
    })
}