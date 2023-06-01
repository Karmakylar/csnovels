const relativeTimePeriods = [
    [31536000, 'y'],
    [2419200, 'mth'],
    [604800, 'w'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
    [1, 'second']
];

function relativeTime(date, isUtc=true) {
    if (!(date instanceof Date)) date = new Date(date * 1000);
    const seconds = (new Date() - date) / 1000;
    for (let [secondsPer, name] of relativeTimePeriods) {
        if (seconds >= secondsPer) {
            const amount = Math.floor(seconds / secondsPer);
            return `${amount}${name}`;
        }
    }
    return 'Just now';
}

// UTC to local
const formatTimeToLocal = (date) => {

    const formatedDate = new Date(date)
    
    const result = relativeTime(formatedDate)

    return ` ${result}`
}

const BookBusiness = {
    formatTimeToLocal
}

export default BookBusiness