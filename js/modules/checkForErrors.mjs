export default function checkForErrors(data) {
    const body = document.querySelector('body')
    const errorMessage = document.createElement('p')
    const errorMessageContainer = document.createElement('div');
    errorMessageContainer.classList.add('error-message-container')
    errorMessage.classList.add('error-message')
    errorMessage.innerHTML = `<h5>It seems we are having some issues, please try again later.</h5> <p> Error Message:${data.status} </p> <p> Error code: ${data.statusCode}</p>
    </br> <a href="./"><button class='btn btn-custom-new-post'>Try again</button></a>`
    errorMessageContainer.append(errorMessage)
    body.append(errorMessageContainer)
    if(data.errors){
        errorMessageContainer.style.display = "flex";
    }
    else {
        errorMessageContainer.style.display = "none";
    }
}