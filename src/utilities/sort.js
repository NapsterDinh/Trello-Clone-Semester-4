export const mapOrder = (array, order,key) =>{
    const temp = [...array]
    temp.sort((a,b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return temp
}

export const mapOrderAndReplaceNotExist = (array, order,key) =>{
    const result=[]
    order.map(item => {
        const temp1 = [...array].filter(item1 => item1[key] === item)
        temp1.length > 0 && result.push(temp1[0])
    })
    return result
}