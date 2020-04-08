module.exports = {
  // REST handler
  postMessagesHandler: function (req, res) {
    postMessagesList(req.body.stepId, req.body.messages, res);
  },

  postMessagesList: function (stepId, messages, res) {
    let cache = {};
    if (messages) {
      //Find all current messages that have same step_id
      persistence()
        .findAll(globals.modelNames.CommunicationMessage, {
          step_id: globals.generateUuidFromString(stepId),
        })
        //Delete all of them
        .then((oldMessages) => {
          cache.oldMessages = JSON.parse(JSON.stringify(oldMessages));
          return persistence().del(globals.modelNames.CommunicationMessage, {
            findBy: {
              step_id: globals.generateUuidFromString(stepId),
            },
          });
        })
        //Save new messages
        .then((result) => {
          let promises = [];
          messages.forEach((message) => {
            promises.push(
              persistence().save(
                globals.modelNames.CommunicationMessage,
                message
              )
            );
          });
          return promises;
        })
        //If a message is gone
        .then((messages) => {
          cache.newMessages = JSON.parse(JSON.stringify(messages));
          let messageMap = new Map();
          cache.newMessages.forEach((message) =>
            messageMap.set(message.id, message)
          );
          let promises = [];
          cache.oldMessages.forEach((message) => {
            if (!messageMap.get(message.id)) {
              //Delete children actions
              //Cascade delete actions (for deleted messages)
              promises.push(
                persistence().del(globals.modelNames.CommunicationAction, {
                  findBy: { message_id: message.id },
                })
              );
            }
          });
          return promises;
        })
        .then((results) => {
          if (cache.newMessages) {
            res.status(httpStatus.OK).send(cache.newMessages);
          } else {
            res.status(httpStatus.NO_CONTENT).send("No content");
          }
        })
        .catch(function (err) {
          console.error(err);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    } else {
      res.status(httpStatus.NO_CONTENT).send("No content");
    }
  },
};
