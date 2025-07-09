import axios from "axios";
import auth from "@/services/auth";
import router from "@/router";
import { useRouter } from "vue-router";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

export default {
  post: function (path_resource, payload, callback) {
    axios
      .post(getServerIp() + path_resource, payload)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              auth.logout();
              // location.reload();
              location.replace("/login-fingerprint");
              break;
            case 500:
              location.replace("/error/500");
              break;
            default:
              callback(error.response);
          }
        } else {
          console.error(error);
        }
      });
  },
  put: function (path_resource, payload, callback) {
    axios
      .put(getServerIp() + path_resource, payload)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              auth.logout();
              location.replace("/login-fingerprint");
              break;
            case 500:
              location.replace("/error/500");
              break;
            default:
              callback(error.response);
          }
        } else {
          console.error(error);
        }
      });
  },

  get: function (path_resource, payload, callback) {
    axios
      .get(getServerIp() + path_resource, {
        params: payload,
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              auth.logout();
              location.reload();
              location.replace("/login-fingerprint");
              break;
            // case 500:
            //   location.replace("/error/500");
            //   break;
            default:
              callback(error.response);
          }
        } else {
          console.error(error);
        }
      });
  },

  getAsync: async function (path_resource, payload) {
    try {
      return await axios.get(getServerIp() + path_resource, {
        params: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (error) {
      //console.log(error);
      if (error.response.status === 401) {
        auth.logout();
        location.reload();
      }
    }
  },

  patch: function (path_resource, payload, callback) {
    axios
      .patch(getServerIp() + path_resource, payload)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          auth.logout();
          location.reload();
        } else {
          if (error.response.status === 500) {
            useRouter().push("/500");
          } else {
            callback(error.response);
          }
        }
      });
  },

  upload: function (path_resource, formData, callback) {
    axios({
      method: "post",
      url: getServerIp() + path_resource,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          auth.logout();
          location.reload();
        } else {
          if (error.response.status === 500) {
            useRouter().push("/500");
          } else {
            callback(error.response);
          }
        }
      });
  },

  delete: function (path_resource, callback) {
    axios
      .delete(getServerIp() + path_resource, {})
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        //console.log(error);
        if (error.response.status === 401) {
          auth.logout();
          location.reload();
        } else {
          if (error.response.status === 500) {
            useRouter().push("/500");
          } else {
            callback(error.response);
          }
        }
      });
  },
};

function getServerIp() {
  var server = "";

  if (!localStorage.getItem("base_url")) {
    server = getServerIp();
  } else server = localStorage.getItem("base_url");

  return server;
}
