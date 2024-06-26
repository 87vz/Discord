const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Berlin', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1111630976557264936')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/developer') //Must be a youtube video link 
    .setState('decay')
    .setName('gg./kissed')
    .setDetails(`gg./kissed [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1038784017203470408/1212764364353044531/73.gif?ex=662a64d4&is=6617efd4&hm=eea48e1fb65deb8ef759998c9054ce154199adbe6b4698c21950cae0894c24d8&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('<3') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/967776024811147295.gif?size=96&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('???') //Text when you hover the Small image


  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `gg./kissed [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
