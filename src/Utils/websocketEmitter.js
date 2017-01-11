const websocketEmitter = (url => {

    let ws;
    const latestEvents = []

    function connect() {
        if (ws && ws.readyState === 1) return

        ws = new WebSocket(url)
        window.ws = ws;
        _subscribe(ws)
    }

    function emit(type, detail) {
        ws.send(JSON.stringify({type, detail}))
        return this
    }

    function _subscribe(ws) {
        ws.addEventListener('message', event => {
            let {type, detail} = JSON.parse(event.data)
            window.dispatchEvent(new CustomEvent(type, {detail}))
        })
    }

    function storeEvent(message) {
        if (message) {
            const currD = new Date()
            latestEvents.push({message, date: `${ currD.getHours() }:${ currD.getMinutes() }`})
            emit('newLatest')
        }
    }

    function getLatestEvents() {
        return latestEvents
    }

    return {
        connect,
        emit,
        storeEvent,
        getLatestEvents
    }

})('wss://admin7.azurewebsites.net/socket')

window.websocketEmitter = websocketEmitter;

export default websocketEmitter