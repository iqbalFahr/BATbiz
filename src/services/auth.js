import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";

const cookieStore = useCookies();
export default {
  isAuthenticated: function () {
    return !!localStorage.getItem("accessToken");
  },

  login: function (email, password, domain, callback) {
    const payload = {
      email,
      password,
    };
    //console.log('login');
    axios
      .post(getServerIp() + "/api/quality-control/auth/login", payload)
      .then((response) => {
        if (response.data.message === "The email field is required.") {
          console.log("authResponse= " + JSON.stringify(response.data.message));
          setTimeout(() => {
            callback(response.data.message);
          }, 1000);
        } else if (
          response.data.message === "The password field is required."
        ) {
          // console.log("authResponse= " + JSON.stringify(response.data.message));
          setTimeout(() => {
            callback(response.data.message);
          }, 1000);
        } else {
          let rootDomain = domain
            .split(".")
            .reverse()
            .splice(0, 2)
            .reverse()
            .join(".");
          rootDomain = rootDomain.split(":")[0];

          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("userId", response.data.userId);

          localStorage.setItem("accessTokenFinger", response.data.token);
          localStorage.setItem("userIdFinger", response.data.userId);

          cookieStore.cookies.set(
            "accessToken",
            response.data.token,
            "30d",
            "/",
            rootDomain
          );
          callback(response.status);
        }
      })
      .catch((error) => {
        callback(error.response.status);
      });
  },

  register: function (payload, callback) {
    axios
      .post(getServerIp() + "/api/quality-control/auth/register", payload)
      .then((response) => {
        callback(response.status);
      })
      .catch((error) => {
        callback(error.response.status, error.response.data.errors);
      });
  },

  forgot: function (payload, callback) {
    axios
      .post(getServerIp() + "/api/quality-control/auth/forgot", payload)
      .then((response) => {
        callback(response.status);
      })
      .catch((error) => {
        callback(error.response.status, error.response.data.errors);
      });
  },

  reset: function (payload, callback) {
    axios
      .post(getServerIp() + "/api/quality-control/auth/reset", payload)
      .then((response) => {
        callback(response.status);
      })
      .catch((error) => {
        callback(error.response.status, error.response.data.errors);
      });
  },

  logout: function (domain) {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("userId", "");

    try {
      let rootDomain = domain
        .split(".")
        .reverse()
        .splice(0, 2)
        .reverse()
        .join(".");
      rootDomain = rootDomain.split(":")[0];
      cookieStore.cookies.remove("accessToken", "/", rootDomain);
    } catch (error) {}
    return true;
  },

  isMe: function (userId) {
    return userId === localStorage.getItem("userId");
  },
};

function getServerIp() {
  var server = "";

  if (!localStorage.getItem("base_url")) {
    server = getServerIp();
  } else server = localStorage.getItem("base_url");

  return server;
}
