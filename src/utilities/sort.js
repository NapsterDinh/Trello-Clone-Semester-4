export const mapOrder = (array, order,key) =>{
    const temp = [...array]
    temp.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return temp
}