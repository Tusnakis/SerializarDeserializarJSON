document.addEventListener('DOMContentLoaded', init);
function init(){

    //Serializar el div cuyo id es izquierda
    var frutas = [];
    var frutaTemp = {};
    var izquierda = document.getElementById("izquierda");
    var factura = document.getElementById("factura");

    for(var i = 0; i < izquierda.children.length; i ++)
    {
        frutaTemp = {
            ref : izquierda.children[i].children[1].children[0].innerText.substr(5),
            precio : izquierda.children[i].children[1].children[1].children[0].innerText,
            src : izquierda.children[i].children[0].getAttribute("src")
        };
        frutas.push(frutaTemp);
    }

    console.log(JSON.stringify(frutas));

    var a = document.createElement("a");
    var texto = document.createTextNode("Descargar JSON");
    a.appendChild(texto);
    a.setAttribute("id","enlace");
    a.href = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(JSON.stringify(frutas));
    factura.appendChild(a);
    var enlace = document.getElementById("enlace");

    enlace.addEventListener("click",descargaArchivo);

    function descargaArchivo()
    {
        var archivo = new Blob(frutas,{type: "application/octet-stream"});
        var reader = new FileReader();
        a.target = "_blank";
        a.download = "frutas.json";
        (window.URL || window.webkitURL).revokeObjectURL(a.href);
        reader.readAsDataURL(archivo);
    }

    //Deserializar sin ajax
    var textoJSON = JSON.parse(JSON.stringify(frutas));

    var htmlCreado = "";

    for(var i = 0; i < textoJSON.length; i++)
    {
        htmlCreado += "<div id='" + textoJSON[i].ref +"' class='fpeque'><img src='" + textoJSON[i].src + "' class='peque'><div><p>ref: <span>" + textoJSON[i].ref +"</span></p><p>precio: <span>" + textoJSON[i].precio + "</span>€ Kg</p></div></div>";
    }

    izquierda.innerHTML = htmlCreado;

    //Deserializar con ajax
    var stringJSONdeFrutasSerializado = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stringJSONdeFrutasSerializado =
                this.responseText;
        }
    };
    //Guardar el fichero frutas.json en la misma carpeta que este script
    xhttp.open("GET", "frutas.json", true);
    xhttp.send();

    textoJSON = JSON.parse(JSON.stringify(stringJSONdeFrutasSerializado));
    for(var i = 0; i < textoJSON.length; i++)
    {
        htmlCreado += "<div id='" + textoJSON[i].ref +"' class='fpeque'><img src='" + textoJSON[i].src + "' class='peque'><div><p>ref: <span>" + textoJSON[i].ref +"</span></p><p>precio: <span>" + textoJSON[i].precio + "</span>€ Kg</p></div></div>";
    }

    izquierda.innerHTML = htmlCreado;

}