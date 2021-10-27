import fetch from "cross-fetch";
export const getAllLists = async (token) => {
    const opt = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Api-Token': token
        },
    }
    
    const allLists = await fetch('https://lifeandmoney.api-us1.com/api/3/lists', opt)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

    return allLists
}