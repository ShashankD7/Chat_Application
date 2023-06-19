const socket = io();

let username = '';
document.getElementById("join-btn").addEventListener('click', (event) => {
    event.preventDefault();
    username = document.getElementById("username-input").value;
    if (username.trim() != '') {
        document.getElementsByClassName("form-username")[0].style.display = 'none';
        document.getElementsByClassName("chatroom-container")[0].style.display = 'block';
        document.querySelector("body").setAttribute("style", "background-color: gray");
        document.getElementsByClassName("chatroom-header")[0].innerHTML = `Chatroom - ${username}`;
    }
})

document.getElementById('send-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
        username: username,
        message: document.getElementById('message-input').value.trim(),
    }
    // emiting with 'message'
    socket.emit('message', data); // this will invoke socket.on() function in server.js
    addMessage(data, true)
});

// first we send the message through socket.emit() (line no. 20) then it will invoke socket.on() in 
// server.js. And in that finction io is emiting the given message to other sockets. so we have to collect
// that message here. So, ->
socket.on('message', (data)=> {
    if (data.username != username){
        addMessage(data, false);
    }
})

// this method is for appending messages
function addMessage (data, check) {
    // check -> true for sent and false for recieved
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if (check) {
        msgDiv.setAttribute("class", "message sent");
    }
    else {
        msgDiv.setAttribute("class", "message recieved");
    }

    document.getElementById('message-container').append(msgDiv);
    document.getElementById('message-input').value = '';
}