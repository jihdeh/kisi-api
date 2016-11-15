import Kisi from "kisi-client";
const kisiClient = new Kisi();

function* loginUser(next) {
  try {
	  const { email, password } = this.request.body;
    const response = yield kisiClient.signIn(email, password);
    this.status = 201;
    // this.response.body = "Successfully Registered";
    this.respose.redirect = "/";
  } catch (error) {
    this.status = 401;
    this.body = error.reason;
  }
}

export default { loginUser }
