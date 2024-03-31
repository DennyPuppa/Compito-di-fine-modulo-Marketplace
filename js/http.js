const abstractFetch = async(url, options = {}) => {
    const defautlHeaders = {
            "Authorization": key,
            "Content-type" : "application/json" ,
    }
    const requestOptions = {
        method: options.method || "GET",
        headers: {...defautlHeaders, ...options.headers},
        ...options
    }
    if (requestOptions.body) {    
        requestOptions.body = JSON.stringify(options.body);
    }
    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
            throw new Error(`${options.method} Response from fetch not ok`)
        }
        return await response.json()
    } catch (error) {
        console.error(error);
        throw error
    }
}