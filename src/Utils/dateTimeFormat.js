export const dateTimeFormat = (datetime) => {
    const dateTimeArr = datetime.split('T')
    const dateArr = dateTimeArr[0].split('-')

    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${dateTimeArr[1].substr(0, 5)}`
}

// function checkOnExpired() {
//     const formattedTimestamp = new Date(formattedDateTime).getTime()
//     const currentTimestamp = Date.now()
//
//     console.log(formattedTimestamp, currentTimestamp, (currentTimestamp-formattedTimestamp)  )
//
//     return false;
// }