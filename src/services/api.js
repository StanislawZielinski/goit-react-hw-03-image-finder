const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
const axios = require('axios').default;
axios.defaults.baseURL = "https://pixabay.com/api/";

async function fetch (searchValue, pageNr) {
    const searchParams = new URLSearchParams(
        {
            key: API_KEY,
            q: searchValue,
            per_page: 12,
            page: pageNr,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
        }
    );

    const responseData = await axios.get(`?${searchParams}`);
    const response = responseData.data.hits;
    return response
};

export default fetch;