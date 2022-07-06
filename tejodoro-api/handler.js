"use strict";

module.exports.hello = async (event) => {
  const now = new Date();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      {
        status: { name: 'pomodoro', endTime: now.setMinutes(now.getMinutes() + 25) },
        participants: [
          {
            username: 'fran'
          },
          {
            username: 'ronny'
          }
        ],
      },
      null,
      2
    ),
  };
};
