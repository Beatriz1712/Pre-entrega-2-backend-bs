document.getElementById('username-form').addEventListener('submit', async(e) => {
e.preventDefault();
const userInputElement = document.getElementById('username');
const messageInputElement = document.getElementById('message');

const user = userInputElement.value;
const message = messageInputElement.value;

try {
const response = await fetch('api/message',{
    method: "POST",
    headers:{
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ user, message}),
})
if(response.ok){
    const responseData = await response.json();
    const successMessage = responseData.message;
    Swal.fire({
        icon:'success',
        title: successMessage,
        text: 'Mensaje enviado',
        confirButtomText:'Aceptar',
    }).then((result)=> {
        if (result.isConfirmed){
            location.reload();
        }
    })
    userInputElement.value = '';
    messageInputElement.value = '';
} else {
    console.error('error al enviar el mensaje');
}
}catch (error){
    console.log('error de red',error);
}
});