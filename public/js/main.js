const usersListing = document.getElementById('users')
const roomName = document.getElementById('room-name')
const chatMessages = document.querySelector('.chat-messages')
const formChat = document.getElementById('chat-form')

const { username, room } = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})

const socket = io()
socket.emit('joinRoom',{username,room})

socket.on('message',(message)=>{
    outMessage(message);
})

socket.on('roomUser',({room,users})=>{
    console.log('activeUsers',users)
    outRoomName(room)
    outActiveUsers(users)
})

formChat.addEventListener('submit',event => {
    event.preventDefault()
    let message = event.target.elements.msg.value
    message = message.trim()

    socket.emit('chatMsg',message)

    event.target.elements.msg.value = ''
})

document.getElementById('leave-btn').addEventListener('click',()=>{
   let cnfrm =  confirm('Are you sure you want to leave?')

   if(cnfrm){
    window.location = '../index.html'
   }
})

function outMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
  
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
  
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.message;
    div.appendChild(para);
  
    document.querySelector('.chat-messages').appendChild(div);
  }
  
  function outRoomName(room) {
    roomName.innerText = room;
  }
  
  function outActiveUsers(users) {
    usersListing.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      usersListing.appendChild(li);
    });
  }