const loginFormHandler = async (event) => {
  event.preventDefault();

  //collect values from login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password").value.trim();


  if(email && password) {
      //send a POST request to the API endpoint
      const response = await fetch("/login", {
          method: "POST",
          body: JSON.stringify({ email, password}),
          headers: { "Content-Type": "application/json"},
      });
      console.log(response);
      if(response.ok){
          document.location.replace("/profile");
      }else{
          alert(response.statusText);
      }
  } else {
      alert("Please enter a valid email and password");    
  } 
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("check signup");

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if(name && email && password) {
      const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ name, email, password}),
          headers: { "Content-Type": "application/json"},
      });

      if(response.ok){
          document.location.replace("/profile");
      }else{
          alert(JSON.parse(response.body));
      }
  }
}

const loginForm = document.querySelector(".login-form");
const signUpForm = document.querySelector(".signup-form");

if(loginForm){
  loginForm.addEventListener("submit", loginFormHandler);
}
if(signUpForm){
  signUpForm.addEventListener("submit", signupFormHandler);
}

