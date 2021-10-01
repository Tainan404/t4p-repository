const Discord = require("discord.js");
const VoiceDiscord = require('@discordjs/voice');
// console.log('Intents',Discord.Intents);
const { Intents } = Discord;

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.GUILD_VOICE,
  ],
});

console.log('cli');


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});


client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === 'jujuba'){    
    // const channel = client.channels.cache.get(msg.channelId);
    // console.log('client.channels.cache',client.channels.cache.find((item)));
    client.channels.fetch(msg.channelId)
      .then((channel)=>{
        console.log('pong');
        
        channel.send('Pong');
      });
    // channel.send('Pong');
    setTimeout(()=> msg.delete(), 1000);
  }

  if (msg.content === 'oi'){    
    // const channel = client.channels.cache.get(msg.channelId);
    // console.log('client.channels.cache',client.channels.cache.find((item)));
    const voiceChannel = client.channels.cache.find((channel)=> {
      let isTheChannel = false;
      console.log('channel',channel);
      console.log('channel.isVoice()',channel.isVoice());
      
      if (channel.isVoice()){
        channel.members.each((v)=> {
          console.log('v',v.user.id);
          if (v.user.id === msg.author.id){
            isTheChannel = true;
          }
        });
      }
      return isTheChannel;
    });
    
    
    
    console.log('voiceChannel',voiceChannel);
    if (voiceChannel){
      const connection = VoiceDiscord.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
    
      try {
        await VoiceDiscord.entersState(connection, VoiceDiscord.VoiceConnectionStatus.Ready, 30e3);
        // return connection;
      } catch (error) {
        connection.destroy();
        throw error;
      }


    }
    // channel.send('Pong');
    setTimeout(()=> msg.delete(), 1000);
  }

  if(msg.content === 'tchau'){
    const voiceChannel = client.channels.cache.find((channel)=> {
      let isTheChannel = false;
      if (channel.isVoice()){
        channel.members.each((v)=> {
          if (v.user.id === msg.author.id){
            isTheChannel = true;
          }
        });
      }
      return isTheChannel;
    });

    const myBotConnection = voiceChannel.members.find((member) => {
      let isTheUser = false;
      console.log('member',member.user);
      const user = member.user;
      if (user.bot) {
        if (user.id === '892886655197929492') {
          isTheUser = true;
        }
      }
      return isTheUser;
    });
    const connection = VoiceDiscord.getVoiceConnection(myBotConnection.guild.id);
    connection.destroy();
  }
});

client.login('ODkyODg2NjU1MTk3OTI5NDky.YVTbfw.tcRFGPEF4TwAszQfiDXUAhYYMmk');