import axios from "axios";
import Kisi from "kisi-client";
const kisiClient = new Kisi();

function* fetchUser(next) {
  const userCookie = this.cookies.get("authorization");
  const user = JSON.parse(userCookie);
  try {
    const getLocks = yield axios.get('https://api.getkisi.com/locks', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Login-Secret': user.secret
      }
    });
    user.locks = getLocks.data;
  } catch (error) {
    console.log(error, "Error getting locks");
  }
  console.log(user)
  this.body = user;
}

export default { fetchUser }
