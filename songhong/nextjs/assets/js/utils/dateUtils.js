export function getArticleDateCreated(data) {
    const {day, month, year} = data[0];
    return {
        day, month, year
    }
}