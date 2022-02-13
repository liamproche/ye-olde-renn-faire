function printFlag(){
   let row = ">>"
    for(let i = 0; i < 4; i++){
    console.log(row)
    row = row + ">>";
    }
    console.log(">>>>>>>>>>>>")
    for(let i = 4; i > 0; i--){
        console.log(row)
        row = row.slice(0, -2)
    }
}

printFlag();