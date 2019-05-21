import {create} from 'apisauce';

const api = create({
    baseURL: '/api',
    headers : {}
});

export const queryPeopleById = function(peopleId){
    return api.post("swinfo",{id:peopleId});  
}

export const queryImage = function(sQueryString){
    return api.post("img",{q:sQueryString});  
}

export default api;