const apiUrl = 'https://admin7.azurewebsites.net'

const requestOptions = {
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
}

export const loginApi = (body) => fetch(`${apiUrl}/login`, {...requestOptions, body})
export const checkAuthApi = () => fetch(`${apiUrl}/username`, {...requestOptions, method: 'get'})
export const signOutApi = () => fetch(`${apiUrl}/logout`, requestOptions)

export const getListApi = (type = '', stateIds = '') => {
    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetList?type=${type}&stateIds=${stateIds}`, {
        ...requestOptions,
        method: 'get'
    })
}

export const getRequestDataApi = (requestId) => {
    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetInfo`, {
        ...requestOptions, body: `[{ key: "RequestID", value: ${requestId} }]`
    })
}