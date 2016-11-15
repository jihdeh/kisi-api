import Kisi from "kisi-client";
const kisiClient = new Kisi();

function* registerUser(next) {
  try {
    const { email, username, password } = this.request.body;
    const response = yield kisiClient.signUp(email, password);
    this.status = 201;
    this.response.body = "Successfully Registered";
  } catch (error) {
    this.status = 422;
    this.body = error.reason;
  }
}

export default { registerUser }
