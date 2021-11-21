import React from 'react';
import '../css/contact.css';
//import '../css/footer.css'
//import 'bootstrap/dist/css/bootstrap.min.css';


class Contact extends React.Component{
  render() {
    return (
        <div className="contact">
            <div class="contact_bx">
                  <form action="#" method="post">
                      <p><h3>Contact Us</h3></p>
                      <input type="text" name="email" placeholder="Email" onChange={this.saveInputs} />
                      <textarea name="message" placeholder="Message"onChange={this.saveInputs} ></textarea>
                      <button onClick={this.saveData} >Send</button>

                  </form>
            </div>
        </div>
    );
  }
}

export default Contact;