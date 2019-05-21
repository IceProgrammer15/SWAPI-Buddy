var http = require('axios');
//Search Google Images and return the first match
const API_URL = "https://www.googleapis.com/customsearch/v1?&cx=CXCXCXCX0&key=KEYKEYKEY&imgSize=medium&num=5&searchType=image&q=";

const lookupImage = async function (sQuery) {
    const URL = `${API_URL}${sQuery}`;
    try{
    const res = await http.get(URL);
    return res.data && res.data.items && res.data.items.length && res.data.items[0].link;
    }catch(ex){
        console.error(ex);
        return null;
    }
}

module.exports = lookupImage;
