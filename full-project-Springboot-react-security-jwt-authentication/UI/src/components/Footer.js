import React  from 'react';
import axios from "axios";
import '../css/footer.css';

class Footer extends React.Component{
    state = {
        input: {},
      };
    
      saveInputs = (event) => {
        var key = event.target.name;
        this.state.input[key] = event.target.value;
        this.setState({ [key]: event.target.value });
      };
    
      saveData = () => {
        console.log(this.state);
        var currentthis = this;
    
        console.log(this.state.input);
        var formData = new FormData();
        for (var data in this.state.input) {
          formData.set(data, this.state.input[data]);
        }
    
        axios
          .post("#", formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then(function (response) {
            console.log(response);
          })
          .then(function (error) {
            console.log(error);
          })
          .then(function () {
            console.log("Always Running");
          });
      };
    
  render(){
      return(
        <React.Fragment>
           <footer class="footer-distributed">

            <div class="footer-left">

                <h3>AdNetworK<span></span></h3>

                <p class="footer-links">
                    <a href="#">Home</a>
                    
                    <a href="#">Blog</a>
                    
                    <a href="#">Pricing</a>
                    
                    <a href="#">About</a>
                    
                    <a href="#">Faq</a>
                    
                    <a href="#">Contact</a>
                </p>

                <p class="footer-company-name">AdNetwork © 2021</p>

                <div class="footer-icons">

                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>

                </div>

            </div>

            <div class="footer-right">

                <p>Contact Us</p>

                <form action="#" method="post">

                    <input type="text" name="email" placeholder="Email" onChange={this.saveInputs} />
                    <textarea name="message" placeholder="Message"onChange={this.saveInputs} ></textarea>
                    <button onClick={this.saveData} >Send</button>

                </form>

            </div>

            </footer>
       </React.Fragment>
  )};
}	
export default Footer;