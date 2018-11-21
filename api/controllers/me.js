module.exports = {

  friendlyName: 'View homepage or redirect',
  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {
    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/profile/me'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },
  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect:'/me'};
    }

    return {};

  }


};
