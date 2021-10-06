import fetch from "cross-fetch"

export const create = async (name, email, token) => {
    return new Promise((resolve, reject) => {
        try {
            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': token
                },
                body: JSON.stringify({
                    contact: {
                        email: email,
                        firstName: name
                    }
                })
            }

            fetch('https://lifeandmoney.api-us1.com/api/3/contacts', opt).then(response => {
                switch(response.status) {
                    case 403:
                        console.log('status: wrong token')
                        return reject({ status: 'wrong token'})
                    case 422:
                        console.log('status: duplicated')
                        return reject({ status: 'duplicated'})
                    case 201:
                        console.log('status: success')
                        return resolve({ status: 'success'})
                    default:
                        console.log('status: fail')
                        console.log(response)
                        return reject({ status: 'fail'})
                }   
            })
        } catch (error) {
            console.log('status: fail')
            return reject({ status: 'fail'})
        }
})}