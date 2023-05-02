import axios from "axios";
async function fetchImages (value, page=1){
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "35835023-fcd630b3e0ba098d72230f346";
    // const param = new URLSearchParams({
    //     key : API_KEY,
    //     q : value,
    //     image_type : "photo",
    //     orientation : "horizontal",
    //     safesearch : true,
    //     per_page : 40,
    //     page : page,
    // })
    
 return  axios.get(`${BASE_URL}`, {
    params: {
        key : API_KEY,
        q : value,
        image_type : "photo",
        orientation : "horizontal",
        safesearch : true,
        per_page : 40,
        page : page,
    }
  }).then((resp) => {
        if(!resp.ok){
            throw new Error(resp.status);
        }
        return resp.json();
    })
}
export {fetchImages}