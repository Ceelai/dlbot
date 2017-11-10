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

function randomDPic(minVal, maxVal){
    do{
        r = Math.random();
    } while (r == 1);
    return minVal+Math.floor(r*(maxVal+1-minVal));
}

var bot = new Discord.Client();


var servers = {};

var randPic = ["https://www.delorean.com/images/homepage/4a.jpg",
 "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Delorean_DMC-12_side.jpg/280px-Delorean_DMC-12_side.jpg",
  "http://www.telegraph.co.uk/cars/images/2016/06/24/101519846_DeLorean-DMC-12-ReduxEyevine-xlarge_trans_NvBQzQNjv4BqqMKo2z_7YU_WfwkpJGaSMkWQ2KsSeoXntDmU1Wc8Jvc.jpg",
   "http://images.car.bauercdn.com/pagefiles/25366/000000delorean-10.jpg", "https://i.pinimg.com/originals/bd/64/45/bd64451607eb9ca5ed5d0b0078287fe9.jpg",
"https://www.delorean.com/images/homepage/1a.jpg", "http://st.automobilemag.com/uploads/sites/11/2016/01/delorean-dmc-12-05.jpg",
"http://49m47r1ce5b927clot3yajgk.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/D-Rex-Rich-GN-DeLorean.jpg",
"https://www.gannett-cdn.com/-mm-/e937ce5de6a6b33fba831b529a9541c8af939460/c=908-741-3791-2909&r=x404&c=534x401/local/-/media/2016/01/28/USATODAY/USATODAY/635895393342923419-delorean.JPG",
"https://icdn-1.motor1.com/images/mgl/EA03v/s4/delorean-limo.jpg", "https://pictures.topspeed.com/IMG/crop/201606/revived-delorean-dmc-2_800x0w.jpg",
"https://www.delorean.com/galleria_images/5615/5615_main_f.jpg", "http://imagesvc.timeincapp.com/v3/foundry/image/?q=70&w=1440&url=http%3A%2F%2Fd254andzyoxz3f.cloudfront.net%2Fdmc_hero.jpg",
"http://www.telegraph.co.uk/cars/images/2016/06/24/3371753_Back-to-the-future-REX_trans_NvBQzQNjv4Bq3e86CPWSU9YM2N6It_dCsY0Lc93gI8sEIYTOj73X0QU.jpg?imwidth=480",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWs6OeJrfEYk9ZwloxkGGFdgbbnm7vZMifdiOEbBsKP1AyhN5mQ",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtm9_WyVbzBF0zMo65w72KxW-74x1BbLhwxdlkr8H4eilYsGySw",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3O8np8TdChmE0c0F7b2Uku_h89-ergrwWvXXV9dOy8So_XwDeyw",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5iOqvlZ_iuInKSgjO82cSOTPOGF5brV6s1Ujl25djVoSjdqCq"];

var randQuo = ["If my calculations are correct, when this baby hits 88 miles per hour... you're gonna see some serious shit.",
"*Marty McFly*: Hey, Doc, we better back up. We don't have enough road to get up to 88. *Dr. Emmett Brown*: Roads? Where we're going, we don't need roads.",
"*Marty McFly*: Whoa. Wait a minute, Doc. Are you trying to tell me that my mother has got the hots for me? *Dr. Emmett Brown*: Precisely. *Marty McFly*: Whoa. This is heavy.*Dr.Emmett Brown*: There's that word again. **Heavy.** Why are things so heavy in the future? Is there a problem with the Earth's gravitational pull?",
"*Marty McFly*: Wait a minute. Wait a minute, Doc. Ah... Are you telling me that you built a time machine... out of a __***DeLorean***__? *Dr. Emmett Brown*: The way I see it, if you're gonna build a time machine into a car, why not do it with some *style?*"];



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
        message.channel.sendMessage("`Created by an Optimal Programmer. I swear im cool :D`");
        break;
        case "deloreanpic":
        message.channel.sendMessage(randPic[randomDPic(0,randPic.length-1)]);
        break;
        case "quote":
        message.channel.sendMessage(randQuo[randomDPic(0,randQuo.length-1)]);
        break;
        case "ohno":
        message.channel.sendMessage("~~Great Scott!~~");
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
        case "thats heavy":
        message.channel.sendMessage("Mans are mad heavy");
        break;
        default:
        message.channel.sendMessage("Square up my guy cause mandems dunno what ur sayin fam");
        message.channel.sendMessage("https://static4.fjcdn.com/thumbnails/comments/Square+up+son+thems+fightin+words+_c2a1d16608c65671177ae3b3f6966542.gif");
    }

  

});




bot.login(TOKEN);