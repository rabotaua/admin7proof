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

export const getListApi = (paramsObj) => {

    const queryParams = {
        type: paramsObj.type || '',
        requestId: paramsObj.requestId || '',
        stateIds: paramsObj.stateIds || '',
        notebookId: paramsObj.notebookId || '',
        eMail: paramsObj.eMail || '',
        responsibleLogin: paramsObj.responsibleLogin || '',
        dateFrom: paramsObj.dateFrom || '',
        isOnlyCount: paramsObj.isOnlyCount || '',
        startRowIndex: paramsObj.startRowIndex || '',
        maximumRows: paramsObj.maximumRows || '',
        sortField: paramsObj.sortField || '',
        sortDirection: paramsObj.sortDirection || ''
    }

    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetList?type=${queryParams.type}&stateIDs=${queryParams.stateIds}&notebookId=${queryParams.notebookId}&requestId=${queryParams.requestId}&eMail=${queryParams.eMail}&responsibleLogin=${queryParams.responsibleLogin}&dateFrom=${queryParams.dateFrom}&isOnlyCount=${queryParams.isOnlyCount}&startRowIndex=${queryParams.startRowIndex}&maximumRows=${queryParams.maximumRows}&sortField=${queryParams.sortField}&sortDirection=${queryParams.sortDirection}`,
        {...requestOptions, method: 'get'})
}

export const getRequestDataApi = (requestId) => {
    return fetch(`${apiUrl}/exec/spAdmin7_Request_GetInfo`, {
        ...requestOptions, body: `[{ key: "RequestID", value: ${requestId} }]`
    })
}