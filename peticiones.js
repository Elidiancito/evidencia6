const cargarTipos = async()=>{
    try{
        const url = "https://attach-cors.herokuapp.com/201.140.116.237/services/tipo.php/"
        await axios 
            .get(url)
            .then((res)=>{
                llenarCombos(res.data)

            })
            .catch((err)=>{
                console.log("Surgio un error en la peticion" +err);
                return false;
            })

    }catch{
        console.log("Surgio un error");
        return false;
    }
    return true;
}

function llenarCombos(data){
    for ( let item of data){
        document.getElementById('tipo').innerHTML += `
        <option value="${item.tipo}">${item.descripcion}</option>`
    }
    document.getElementById('tipo').innerHTML+=`
    </select>
    `
};

const cargarTabla = async ()=> {
        try{
           const url = "https://attach-cors.herokuapp.com/201.140.116.237/services/ventas.php/"
            await axios 
            .get(url)
            .then((res)=>{
                dibujarTabla(res.data);
            })
            .catch((err)=>{
                console.log("Error en la peticion" +err);
                
        })

        }catch{
            console.log("Surgio un error.")
        }
}
function dibujarTabla(data){
    
    let tipo = document.getElementById("tipo").value;
    document.getElementById("ventas").innerHTML = ``

    for ( let item of data){

        if(item.tipo == tipo){
        document.getElementById("ventas").innerHTML += `
        <tr>
            <td>${item.folio}</td>
            <td>${item.tipo}</td>
            <td>${item.precio}</td>
            <td>${item.descuento}</td>
            <td>${item.total}</td>
            <td>${item.fechapago}</td>
            <td>${item.giro}</td>
        </tr>`
        }
    }
}

const inicia = async ()=>{
    if(await cargarTipos()==true){
        cargarTabla();
        
    }
        document.getElementById("tipo").addEventListener("change",async()=>{
        cargarTabla();
        });
      
    }
    

inicia();