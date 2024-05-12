socket = io()

socket.on('client', (data)=>{
    console.log(data)
})