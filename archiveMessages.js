// scripts/archiveMessages.js

const cron = require('node-cron');
const ArchivedChat = require('../models/archivedChat');
const Chat = require('../models/chat');
const sequelize = require('./util/database');


cron.schedule('0 0 * * *', async () => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const messagesToArchive = await Chat.findAll({
      where: {
        createdAt: {
          [sequelize.Op.lt]: oneDayAgo,
        },
      },
    });

    if (messagesToArchive.length > 0) {
      await ArchivedChat.bulkCreate(messagesToArchive.map((message) => message.toJSON()));
      await Chat.destroy({
        where: {
          createdAt: {
            [sequelize.Op.lt]: oneDayAgo,
          },
        },
      });

      console.log(`Archived ${messagesToArchive.length} messages.`);
    }
  } catch (error) {
    console.error('Error archiving messages:', error);
  }
});
