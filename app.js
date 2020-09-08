var express = require('express');
var app = express();
var baseUsuarios=[];

var bodyParser = require("body-parser");
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
   
    res.sendFile('index.html', { root: __dirname });
});

app.get('/eliminar',function(req,res){
    res.sendFile('borrar.html',{root:__dirname});
});
app.post('/eliminar',function(req,res){
    var nuevaBase=[];
   for(let i=0;i<baseUsuarios.length;i++){
        if(baseUsuarios[i].id==(req.body.id)){
           console.log('si compara');
        }
        else{
           nuevaBase.push(baseUsuarios[i]);
        }
    }
    baseUsuarios=nuevaBase;
    res.send('<p>Usuario eliminado correctamente</p> <br><a class="navi2" href="/eliminar">volver</a>');
}
);
app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    res.redirect('/');
    var nombre = req.body.firstName;
    var apellido= req.body.lastName;
    var year=req.body.year;
    var id= req.body.id;
    var nuevoUsuario= new crearUsuario(nombre,apellido,year,id);
    baseUsuarios.push(nuevoUsuario);
   
    
    
});

app.get('/mostrar-datos', function (req, res) {
    var html='<table><tr><th> id </th><th>   nombre y apellido   </th> <th>   edad   </th></tr>';
    for(let i=0;i<baseUsuarios.length;i++){
        html=html+'<tr>'+'<th>'+baseUsuarios[i].id+'</th>'+'<th>'+baseUsuarios[i].nombre+' '+baseUsuarios[i].apellido+'</th>'+'<th>'+baseUsuarios[i].edad+'</th>'+'</tr>'
        
    }
    html=html+'</table>'+ '<br><br><a class="navi2" href="/">Volver</a>';
    res.send(html);
   

}
);
var server = app.listen(5000, function () {
    console.log('Node server is running..');
});

function crearUsuario(nombre, apellido, edad, id){
    this.nombre=nombre;
    this.apellido=apellido;
    this.edad=edad;
    this.id=id;

}


