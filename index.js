const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const TOKEN = "MzYyNDMyNTA3NDQ4MTMxNTg0.DODThQ.y4IfDzjVxNlPqr-GGzwxXUAa7Ng";

const PREFIX = "//";


function play(connection,message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();

    server.dispatcher.on("end", function(){
        if (server.queue[0]){
            play(connection,message);
        } else{
            connection.disconnect();
        }
    });

}

var bot = new Discord.Client();


var servers = {};

bot.on("ready", function(){

console.log("ready");
});

bot.on("message", function(message){
    if (message.author.equals(bot.user)){
        return;
    }

    if (!message.content.startsWith(PREFIX)){
        return; 
    }

    var args = message.content.substring(PREFIX.length).split(" ");

   
    switch (args[0].toLowerCase()){
        case "ping":
        message.channel.sendMessage("AIGHT YOU PINGED ME WAS GOOD LMAO");
        break;
        case "info":
        message.channel.sendMessage("Created by an Optimal Programmer");
        message.channel.sendMessage("https://img.memecdn.com/Niggawatts_o_110162.jpg");
        break;
        case "play":
            if (!args[1]){
                message.channel.sendMessage("you gotta sauce me a link fam **STAY WOKE**");
                return;
            }

            if (!message.member.voiceChannel){
                message.channel.sendMessage("Getcho ass into a voice channel my guy");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] ={
                queue:[]
            };
            var server = servers[message.guild.id];

            if (!message.guild.voiceConnection){
                message.member.voiceChannel.join().then(function(connection){
                    play(connection, message);
                });
            }
            break;
        case "thatsheavy":
        message.channel.sendMessage("Whoa. Wait a minute, Doc. Are you trying to tell me that my mother has got the hots for me?");
        break;
        default:
        message.channel.sendMessage("Square up my guy");
    }

  

});




bot.login(TOKEN);