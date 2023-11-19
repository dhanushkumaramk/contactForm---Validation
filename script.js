const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// --------decleration----------//

function sendEmail() {
  const bodyMessage = `Full Name : ${fullName.value}<br> Email : ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value} `;
  // ----------------------------get below code from smtp.elasticemail.com----
  Email.send({
    SecureToken: "82a90c5f-8618-4f6d-b6ba-849bdae418dc",
    To: "dhanushkumaramk@gmail.com",
    From: "dhanushkumaramk@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      // -------------------from sweetalert2.github.io-------//
      Swal.fire({
        title: "Success!",
        text: "Message Send Successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    //-----------Add Error Class-------------//
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    if (items[1].value != "") {
      checkEmail();
    }
    items[1].addEventListener("keyup", () => {
      checkEmail();
    });
    //---------------- If area is empty then add erroe class -------------//
    //-------- else remove ----------//

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
function checkEmail() {
  const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  const errorTxtEmail = document.querySelector(".error-text.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");
    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a Valid  Email Adress";
    } else {
      errorTxtEmail.innerText = "Email Address Can't Be Blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !message.classList.contains("error")
  );
  {
    sendEmail();
    form.reset();
    return false;
  }
});
