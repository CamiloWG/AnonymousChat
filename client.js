
const socket = io()

let cantidad = 0;
let uname = prompt("Ingrese su nombre de anónimo para chatear:");
const message = document.getElementById('message');
const btnEnviar = document.getElementById('btnSend');
const output = document.getElementById('output');
const actions = document.getElementById('actions');


btnEnviar.addEventListener('click', () => {
    SendMessage();
});

function SendMessage() {
    socket.emit("chat:message", {
        username: uname,
        message: message.value
    })
    message.value = "";
}

message.addEventListener('keypress', (e) => {

    socket.emit("chat:typing", uname);

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode == 13)
    {
        SendMessage();

    }
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `
        <p>${data.username} dice: ${data.message}</p>
    `
    
    if(cantidad >= 9) 
    {
        output.innerHTML = "";
        cantidad = 0;
    } else cantidad++;
});

socket.on('chat:typing', (name) => {
    actions.innerHTML = `<b>${name} está escribiendo...</b>`;
});