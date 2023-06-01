const convertTo12Hours = (date) => {

    let currentTime
    let Hours = date.getHours()
    let Minutes = date.getMinutes()
    let Format = Hours > 12 ? "PM" : "AM"

    currentTime = Hours

    if (Hours > 12) {
        currentTime = Hours - 12
    }

    if (Hours == "00") {
        currentTime = 12
    }

    return `${currentTime < 10 ? "0" + currentTime : currentTime}:${Minutes < 10 ? "0" + Minutes : Minutes}${Format}`

}


const formatTimeToLocal = (date) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatedDate = new Date(date)
    const todaysDate = new Date()

    const currentMonth = monthNames[formatedDate.getMonth()]
    const currentDate = formatedDate.getDate()
    const currentTime = convertTo12Hours(formatedDate)

    // if year , month and date matches today's date

    if (
        todaysDate.getFullYear() === formatedDate.getFullYear() &&
        todaysDate.getMonth() === formatedDate.getMonth() &&
        todaysDate.getDate() === formatedDate.getDate()
    ) {
        return `Today ${currentTime}`;
    }

     // if year , month and date matches yesterday's date

    if (
        todaysDate.getFullYear() === formatedDate.getFullYear() &&
        todaysDate.getMonth() === formatedDate.getMonth() &&
        (todaysDate.getDate() - 1) === formatedDate.getDate()
    ) {
        return `Yesterday ${currentTime}`;
    }

    return `${currentMonth} ${currentDate}, ${currentTime}`
}

const BookBusiness = {
    formatTimeToLocal
}

export default BookBusiness