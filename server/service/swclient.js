var http = require('axios');
//API end-point for searching people
const SWAPI_URL = "https://swapi.co/api/people";

const SCHEMA_TEMPLATE = {
    name: null,
    height: null,
    mass: null,
    hair_color: null,
    skin_color: null,
    gender: null,
    birth_year: null,
    homeworld: {
        name: null,
        terrain: null,
        population: null,
    },
    species: [{
        name: null,
        average_lifespan: null,
        designation: null,
        language: null,
    }],
    films: [{
        title: null,
        director: null,
        producer: null,
        release_date: null
    }]
};


const lookupPeople = async function (id) {
    const URL = `${SWAPI_URL}/${id}`;
    
    const res = await http.get(URL);//Call SWAPI API
    const data = res.data; //API result

    //Keep a copy of the empty json schema (with mepty arrays) that we want to have at the end
    const finalResult = {
        ...SCHEMA_TEMPLATE,
        homeworld: {...SCHEMA_TEMPLATE.homeworld},
        species: [],
        films: []
    };

    //Updating finalResult with information in two phase:
    //1. Assign simple values available in people API result
    //2. Call appropriate API for complex fields (homeworld,species,films) and update finalResult
    //We send multiple asyncronus requests and update the object with results
    //We will have entire information at the end when Promise.All is resolved.
    var promiseArray = [];
    Object.keys(SCHEMA_TEMPLATE).forEach(key => {
        //check if it's a complex field and API call is necessary 
        if (SCHEMA_TEMPLATE[key] && typeof SCHEMA_TEMPLATE[key] === 'object') {
            if (Array.isArray(data[key])) {
                //One API call for each item in the array
                data[key].forEach((url, idx) => {
                    promiseArray.push(acquireAndTransform(key, idx, url));
                });
            } else {
                promiseArray.push(acquireAndTransform(key, null, data[key]));
            }
        } else {
            //It is a simple property => update finalResult directly
            finalResult[key] = data[key];
        }
    });

    const finalData = await Promise.all(promiseArray);
    //Loop through all API results and update the finalResult accordingly
    for (var result of finalData) {

        if (Array.isArray(finalResult[result.key])) {
            //Schema of the Array Elements
            const template = SCHEMA_TEMPLATE[result.key][0];
            //construct object from the result according to the schema
            const item = Object.keys(template).reduce((res, key) => {
                res[key] = result.data[key];
                return res;
            }, {});
            //Position of Array elements will be preserved by promise.all, only need to push it to the array
            //We have element position in results.idx if required in other cases for sorting the array
            finalResult[result.key].push(item);
        } else {
            //Simple Object (NOT Array)
            const template = SCHEMA_TEMPLATE[result.key];
            Object.keys(template).forEach(key => {
                finalResult[result.key][key] = result.data[key];
            });
        }
    }
    return finalResult;
}

const acquireAndTransform = function (key, index, url) {
    return http.get(url).then(res => {
        return {
            key: key,
            idx: index,
            data: res.data
        };
    });
}


module.exports = lookupPeople;
