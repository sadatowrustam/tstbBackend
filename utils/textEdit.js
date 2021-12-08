exports.textEdit=(text)=>{
    let array=[]
    let b=''
    text.forEach(e=>{
        for(var i=0;i<e.length;i++){
            if(e[i]=='"'){
                b+="\\"+e[i]
            }else{
                b+=e[i]
            }
        }
        array.push(b)
    })
    console.log(array)
    return array
}
