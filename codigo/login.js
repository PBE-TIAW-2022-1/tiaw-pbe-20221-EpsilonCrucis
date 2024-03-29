const LOGIN_URL = "login.html";
let usuarioCorrente = {};
let db_usuarios = {};

function generateUUID() { 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const dadosIniciais = {
    usuarios: [ { "id": generateUUID (), "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com"} ]
};

function initLoginApp () {
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    let usuariosJSON = localStorage.getItem('db_usuarios');
    
    if (!usuariosJSON) {
        db_usuarios = dadosIniciais;
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};

function addUser (nome, user, senha, email) {  
    let usuario = { "id": generateUUID (), "login": user, "senha" : senha, "nome": nome, "email": email }; 
    db_usuarios.usuarios.push(usuario);
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

function loginUser (login, senha) { 
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];
        
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
                        
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
           
            return true;
        }
    }

    return false;
}

function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

function verificaUser(user){
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];      
        if (user == usuario.login) {          
            return true;
        }
    }
    // não existe usuario com esse nome 
    return false;
}
   
initLoginApp ();



