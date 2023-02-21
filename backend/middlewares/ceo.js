const axios = require("axios");
const config = require("../config/ceo");
const url =
  "https://contact-everyone.orange-business.com:443/api/v1.2/groups/8c56457e-6749-4b9c-b6de-9ca6c4d801e4/diffusion-requests";
var token = {
  token: "",
  created_at: "",
};
var tunnel = require("tunnel");
const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "cs.pr-proxy.service.sd.diod.tech",
    port: 3128,
  },
});

class Token {
  constructor() {
    this.checkToken();
  }

  getToken() {
    return new Promise((res, rej) => {
      const urlToken =
        "https://contact-everyone.orange-business.com:443/api/v1.2/oauth/token";
      const params = new URLSearchParams();
      params.append("username", config.username);
      params.append("password", config.password);

      const configAxios = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpsAgent: agent,
        proxy: false,
      };

      axios
        .post(urlToken, params, configAxios)
        .then((result) => {
          token = {
            token: result.data.access_token,
            created_at: new Date(),
          };
          console.log(token);
          res(true);
        })
        .catch((err) => {
          console.log(err);
          rej(err);
        });
    });
  }

  async checkToken() {
    return new Promise((res, rej) => {
      // if (token.created_at !== '') {
      //     const now = new Date().getTime();
      //     console.log(now, token.created_at.getTime() + 3600000)
      //     if ((token.created_at.getTime() + 3600000) < now) {
      // this.getToken().then((data) => {
      //     if (data === true)
      //         res(true);
      //     else
      //         rej(false);
      // });
      //         } else
      //             res(true);
      //     } else if (token.created_at === '') {
      //         this.getToken().then((data) => {
      //             if (data === true)
      //                 res(true);
      //             else
      //                 rej(false);
      //         });
      //     }
    });
  }
}

const tokenManager = new Token();

function sendMails(emails, content, subject, sender) {
  tokenManager.checkToken().then((data) => {
    if (data === true) {
      axios({
        method: "post",
        url: url,
        headers: {
          Authorization: "Bearer " + token.token,
        },
        httpsAgent: agent,
        proxy: false,
        data: {
          name: "Clic Calme mail",
          emails: emails,
          emailParam: {
            senderEmail: "noreply@ms.contactevery.one",
            senderName: sender,
            body: content,
            subject: subject,
          },
        },
      })
        .then((result) => {
          console.log("a mail was send");
          if (result.status === 201) return true;
          else {
            console.log(result);
            return false;
          }
        })
        .catch((err) => {
          console.log("error when send mail");
          return false;
        });
    } else {
      tokenManager.getToken().then((data) => {
        axios({
          method: "post",
          url: url,
          headers: {
            Authorization: "Bearer " + token.token,
          },
          httpsAgent: agent,
          proxy: false,
          data: {
            name: "Clic Calme mail",
            emails: emails,
            emailParam: {
              senderEmail: "noreply@ms.contactevery.one",
              senderName: sender,
              body: content,
              subject: subject,
            },
          },
        })
          .then((result) => {
            console.log("a mail was send");
            if (result.status === 201) return true;
            else {
              console.log(result);
              return false;
            }
          })
          .catch((err) => {
            console.log("error when send mail");
            return false;
          });
      });
    }
  });
}

const ceo = {
  sendMails,
};

module.exports = ceo;
