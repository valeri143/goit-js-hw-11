import axios from "axios";
async function fetchImages (value, page=1){
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "35835023-fcd630b3e0ba098d72230f346";
    const params = new URLSearchParams({
        key : API_KEY,
        q : value,
        image_type : "photo",
        orientation : "horizontal",
        safesearch : true,
        per_page : 40,
        page : page,
    })
    const URL = `${BASE_URL}?${params}`;
    const response = await axios.get(URL, params);
    if(response.status !== 200){
        throw new Error(response.status);
    }
    return response.data;
}
export {fetchImages}