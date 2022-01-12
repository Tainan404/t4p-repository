import Discord from 'discord.js';
import * as DiscordVoice from '@discordjs/voice';
import config from '../config/config';


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
  console.log(Date.now());
  
});


client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === 'ping'){    
    client.channels.fetch(msg.channelId)
      .then((channel)=>{ 
        channel.send('Pong')
        .then(message => {
          console.log(`Sent message: ${message.content}`);
          setTimeout(() => {
            message.delete();
          }, 1000);
        })
      });
    setTimeout(()=> msg.delete(), 1000);
  }

  if (msg.content === 'oi'){    
    const guild = await client.guilds.fetch(msg.guildId);
    const member = await guild.members.fetch(msg.author.id);
    const voiceChannel = member.voice.channel;

    if (voiceChannel){
      
      const connection = DiscordVoice.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
    
      try {
        await DiscordVoice.entersState(connection, DiscordVoice.VoiceConnectionStatus.Ready);
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
    msd
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
      console.log('member',member.user  );
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