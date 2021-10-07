const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const config = require('./config');


const { Intents } = Discord;

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.GUILD_VOICE,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});


client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === 'ping'){    
    client.channels.fetch(msg.channelId)
      .then((channel)=>{ 
        channel.send('Pong');
      });
    setTimeout(()=> msg.delete(), 1000);
  }

  if (msg.content === 'oi'){    
    const voiceChannel = client.channels.cache.find((channel)=> {
      let isTheChannel = false;
      
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

    if (voiceChannel){
      const connection = DiscordVoice.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
    
      try {
        await DiscordVoice.entersState(connection, DiscordVoice.VoiceConnectionStatus.Ready, 30e3);
      } catch (error) {
        connection.destroy();
        throw error;
      }


    } else {
      msg.channel.send('User isn\'t in a voice channel')
    }
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
    const connection = DiscordVoice.getVoiceConnection(myBotConnection.guild.id);
    connection.destroy();
  }
});

client.login(config.DISCORD_API.TOKEN);