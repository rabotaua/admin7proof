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

export const getListApi = (paramsObj, paramsString = '' /* second arg is optional */) => {

    /* ==== AVAILABLE PARAMS: ====
     type,
     requestId,
     notebookId,
     eMail,
     stateIds,
     responsibleLogin,
     dateFrom,
     isOnlyCount,
     startRowIndex,
     maximumRows,
     sortField,
     sortDirection
     */

    if (!paramsString) {
        // eslint-disable-next-line
        Object.keys(paramsObj).map(param => {
            if (paramsObj[param].length !== '') {
                paramsString += `${param}=${paramsObj[param]}&`
            }
        })
    }

    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetList?${paramsString}`, {...requestOptions, method: 'get'})
}

export const getRequestDataApi = (requestId) => {
    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetInfo`, {
        ...requestOptions, body: `[{ key: "RequestID", value: ${requestId} }]`
    })
}