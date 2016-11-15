import axios from "axios";
import Kisi from "kisi-client";
const kisiClient = new Kisi();

function* getLocks(next) {
  const userCookie = this.cookies.get("authorization");
  const user = JSON.parse(userCookie);
  try {
    const locks = yield axios.get('https://api.getkisi.com/locks', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Login-Secret': user.secret
      }
    });
    user.locks = locks.data;
  } catch (error) {
    console.log(error, "Error getting locks");
  }
  this.body = user;
}

function* createLocks(next) {
  //name, channel, place_id
  const lock = this.request.body;
  try {
  	//not sure how to set the login secret with the client
    const create = yield kisiClient.post("locks", { lock })
    this.status = 201;
    console.log("created lock", create)
    this.body = "created";
  } catch (error) {
    this.status = 422;
    console.log(error, "Error getting locks");
  }
}

function* unlockLock(next) {
  //name, channel, place_id
  const place_id = this.params.place_id;
  try {
    const create = yield kisiClient.post(`locks/${place_id}/unlock`, {});
    this.status = 201;
    console.log("unlocked lock", create)
    this.body = "unlocked";
  } catch (error) {
    this.status = 422;
    console.log(error, "Error locking");
  }
}

export default { getLocks, createLocks, unlockLock }
