import fetch from "cross-fetch";
export const getAllLists = async (apiUrl, token) => {
    const opt = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Api-Token': token
        },
    }
    
    const allLists = await fetch(`${apiUrl}/api/3/lists`, opt)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

    return allLists
}