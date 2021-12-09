export const converDateFormat = (data) => {
    var date = new Date(parseInt(data));
    var fdate = (date.getMonth() + 1)+'-'+ date.getDate()  +'-'+date.getFullYear()
    return fdate
}