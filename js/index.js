// JavaScript Document
/*
Forked from https://codepen.io/z-/pen/eJNgWO
*/
$(document).ready(function(e) {
   var faviconnumber = 1;
	function favicon() {
		favicon = favicon == 1 ? 2 : 1;
		$('.favicon').attr('href','favicon' + favicon + ".png");
	}
   console.clear();
   var commandlist = [ /*Can be populated with various methods*/
      ["/help", "Show commands"],
      ["/list", "List all pages on the website"],
      ["/nav &lt;location&gt;", "Navigate to location"],
	  ["/clear", "Clear the console"],
   ];
   var previouscommands = [];
   var currentcommand = 0;
   
   var pageExamples = [["index", "Welcome to Koya.io", "Simply, this is just a sandbox in which to add to; no real point - a couple of features that I plan to add though:", "URL shortner and open tracker, just enter a URL into the command line and press enter and you will get 2 links - 1 which looks like [http://koya.io/XXXXXX](http://koya.io/XXXXXX) and another [http://koya.io/u/XXXXXX](http://koya.io/u/XXXXXX) : they will both forward but the second will show a preview of the full url so they know where you are going.", "You can also save small messages with `/msg <string <160 chars>` and you will get a url like [http://koya.io/XXXXXX](http://koya.io/XXXXXX)","Pressing Ctrl+v will paste the short text or image and you will get a link.", "There will be accounts but likely given out rather than being able to register them whenever, this is a personal site so idk."],
      ["about", "About Koya.io", "Personal power website for Finn 'Koya' Shackleton.", "Will include some features which too are mainly for personal use: Link shortner, image host, pastebin and any sandbox testing", "The colours have been taken from [https://github.com/Poorchop/darktooth-theme-ports/tree/8c852e8edde8df57d831dc8631493b0565fadbbc/hexchat-darktooth](Poorchop's Darktooth HexChat theme)", "In the process of turning the website into a server sided thing, currently what you can read is in the [http://koya.io/scripts.js](JavaScript file)!"]];
   
   
   var pages = [ /*Can be populated with various methods*/
      ["index", "Welcome to ZhejunLiu.net","someIntro" ],
      ["about", "About ZhejunLiu.net", "Some ABout"],
	  ["connect", "Connect with Zhejun",
	  "[mailto:ZhejunLiu001@gmail.com](Email ZhejunLiu001@gmail.com)",
	  "[^https://www.linkedin.com/in/zhejun-liu/](LinkedIn) ",
	  "[^https://www.github.com/ZhejunLiu/](GitHub)",
	  "[^https://codepen.io/ZhejunLiu/](Codepen)"]
   ];
   var pageindex = ["index", "about", "connect"];
   var currentpage = "landing";
   var url = "http://ZhejunLiu.net"
      /*
         Custom Text Syntax
         Links:      
            [URLPATH](NAME) - regular
            [^URLPATH](NAME) - open in new tab
            
         Styles:
            *TEXT* - bold text
            E! - Text is an error/notification
            A! - spaces are converted to non-breaking spaces (it's for ascii art - after all, this is a text based website)
      */

   function init() {
      setInterval(time);
      console.clear();
      console.log(new Date().getTime());
		log("Website", "A!  ________   __                                   __                                     __       ");
		log("Website", "A! /\\_____  \\ /\\ \\               __                /\\ \\       __                          /\\ \\__    ");
		log("Website", "A! \\/____//'/'\\ \\ \\___      __  /\\_\\  __  __    ___\\ \\ \\     /\\_\\  __  __      ___      __\\ \\ ,_\\   ");
		log("Website", "A!      //'/'  \\ \\  _ `\\  /'__`\\\\/\\ \\/\\ \\/\\ \\ /' _ `\\ \\ \\  __\\/\\ \\/\\ \\/\\ \\   /' _ `\\  /'__`\\ \\ \\/   ");
		log("Website", "A!     //'/'___ \\ \\ \\ \\ \\/\\  __/ \\ \\ \\ \\ \\_\\ \\/\\ \\/\\ \\ \\ \\L\\ \\\\ \\ \\ \\ \\_\\ \\__/\\ \\/\\ \\/\\  __/\\ \\ \\_  ");
		log("Website", "A!     /\\_______\\\\ \\_\\ \\_\\ \\____\\_\\ \\ \\ \\____/\\ \\_\\ \\_\\ \\____/ \\ \\_\\ \\____/\\_\\ \\_\\ \\_\\ \\____\\\\ \\__\\ ");
		log("Website", "A!     \\/_______/ \\/_/\\/_/\\/____/\\ \\_\\ \\/___/  \\/_/\\/_/\\/___/   \\/_/\\/___/\\/_/\\/_/\\/_/\\/____/ \\/__/ ");
		log("Website", "A!                              \\ \\____/                                                            ");
		log("Website", "A!                               \\/___/                                                             ");

      log("Website", '[^http://ZhejunLiu.net/](*ZhejunLiu.net*)');
      log("Website", "");
      log("Website", "");
	  urlvars();
      log("Client", "For help say '/help'");
	  setInterval(favicon,500);
   }

   function urlvars() {
	   var pagelocs = window.location.pathname.replace("/","").split("/");
	   var pageloc = pagelocs[0];
	   console.log(pageloc);
	   //alert();
		if(pageloc != "") {
            if ($.inArray(pageloc, pageindex) >= 0) {
               currentpage = pageloc;
            }
		}
      	log("Website", "You are currently on page: *" + currentpage + "*");
		if(pageloc != "") {
            if ($.inArray(pageloc, pageindex) >= 0) {
               currentpage = pageloc;
               loadpage($.inArray(pageloc, pageindex));
            } else {
               //Un-note next line to show 404 errors with wrong urls
               //log("Client", "404 - The page '" + pageloc + "' does not exist. To "); 
            }
		}
		if(pageloc == "") {
      		log("Client", "What would you like to access?");	
		}
   }
   function getParam(name){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec (window.location.href);
		if (results == null) {
			return "";
		}
		else  {
			return results[1];
		}
	}

   function log(name, information) {
      var d = new Date();
      var hours = ((d.getHours() < 10) ? "0" : "") + d.getHours();
      var minutes = ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
      var seconds = ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
      var colour = "whitet";
      var textcolour = "";
      var postcolour = "";

      switch (name[0]) {
         case "!":
            postcolour = " important";
            name = name.substr(1);
            break;
      }
      switch (name) {
         case "Website":
            colour = "redt";
            break;
         case "Server":
            colour = "bluet";
            break;
         case "Client":
            colour = "bluet";
            break;
         case "User":
            colour = "greent";
            postcolour = " selft";
            break;
      }
      if (information[0] == "A" && information[1] == "!") {
         information = information.substr(2);
         information = information.replace(/ /g, '\u00A0');
      }
      if (information[0] == "E" && information[1] == "!") {
         information = information.substr(2);
         postcolour = " important";
      }

      while (information.indexOf("](") >= 0) { //URL parser

         var NAMEregExp = /\(([^)]+)\)/;
         var uname = NAMEregExp.exec(information)[1];

         var URLregExp = /\[([^)]+)\]/;
         var url = URLregExp.exec(information)[1];
         var newpage = false;
         if (url[0] == "^") {
            newpage = true;
            url = url.substr(1);
         }
         var start = information.indexOf("[");
         var end = information.indexOf(")");
         if (newpage) {
            information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '" target="_blank">' + uname + '</a>');
         } else {
            information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '">' + uname + '</a>');
         }
         //information = '<a href="' + url + '">' + uname + '</a>'; //working

      }
      var tobold = true;
      var boldnumber = 0;
      for (var i = 0; i < information.length; i++) {
         if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
            boldnumber++;
         }
      }
      while (information.indexOf("*") >= 0) { //Bold parser
         var pos = information.indexOf("*");
         information = information.replace("*", "");
         if (tobold) {
            information = information.splice(pos, 0, '<b>');
         } else {
            information = information.splice(pos, 0, '</b>');
         }
         tobold = !tobold;
         if (tobold && boldnumber <= 1) {
            break;
         }
         //information = '<a href="' + url + '">' + uname + '</a>'; //working
      }
      var tounderline = true;
      var underlinenumber = 0;
      for (var i = 0; i < information.length; i++) {
         if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
            underlinenumber++;
         }
      }
      while (information.indexOf("**") >= 0) { //Bold parser
         var pos = information.indexOf("**");
         information = information.replace("**", "");
         if (tounderline) {
            information = information.splice(pos, 0, '<u>');
         } else {
            information = information.splice(pos, 0, '</u>');
         }
         tounderline = !tounderline;
         if (tounderline && underlinenumber <= 1) {
            break;
         }
         //information = '<a href="' + url + '">' + uname + '</a>'; //working
      } /**/
      $(".stream").append('<div class="line">' +
         '<p class="time">[' + hours + ":" + minutes + ":" + seconds + ']</p>' +
         '<p class="name ' + colour + '">' + name + '</p>' +
         '<p class="information' + postcolour + '">' + information + '</p>' +
         '</div>');
      $(document).scrollTop($(document).height() - $(window).height());
   }
	var timestring = "";
   function time() {
      var d = new Date();
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      if (hours < 10) {
         hours = "0" + hours;
      }
      if (minutes < 10) {
         minutes = "0" + minutes;
      }
      if (seconds < 10) {
         seconds = "0" + seconds;
      }
	  var temptimestring = "[" + hours + ":" + minutes + ":" + seconds + "]";
	  if (temptimestring != timestring) {
		  timestring = temptimestring;
      	$(".editline .time").text(timestring);
	  }
   }

   var ctrldown = false;
   $(".editline .edit").keydown(function(e) {
      var text = $(".editline .edit").text();
      console.log(e.which);
      if (e.which == 13 && text !== "" && !ctrldown) {
         var commands = text.split(' ');
         var output = "";
         if (commands[0] == "help") {
            text = "/" + text;
         }
         $(".editline .edit").text("");
         log("User", text);

         previouscommands[currentcommand] = text;
         currentcommand = previouscommands.length;
         $(".editline .edit").keydown(35);
         cmd(commands[0], text, commands);
         /*Add mod commands*/
         //modcmd(commands[0], text, commands);
         /*Add mod commands*/

      }
      if (e.which == 38) { //up
         if (currentcommand > 0) {
            currentcommand--;
            $(".editline .edit").text(previouscommands[currentcommand]);
         }
      }
      if (e.which == 40) { //down

         if (currentcommand < previouscommands.length) {
            currentcommand++;
            $(".editline .edit").text(previouscommands[currentcommand]);
         }
      }
   });

   function cmd(command, words, word) {
      switch (word[0]) {
         case "/help":
         case "help":
            for (var i = 0; i < commandlist.length; i++) {
               output = commandlist[i][0] + " : " + commandlist[i][1];
               //console.log(command[i][0]);
               log("Client", output);
            }
            break;
         case "/clear":
            $(".stream").text("");
            break;
         case "/nav":
            if ($.inArray(word[1], pageindex) >= 0) {
               currentpage = word[1];
               log("Website", "You are now in " + currentpage);
               loadpage($.inArray(word[1], pageindex));
            } else {
               log("Client", "'" + word[1] + "' does not exist.");
            }
            break;
         case "/list":
            $.each(pageindex, function(id, content) {
               log("Client", "> " + content);
            });
            break;
         default:
            output = "Unrecognised command '" + word[0] + "'.";
            log("Client", output);
      }
   }

   function loadpage(i) {
      $.each(pages[i], function(id, content) {
         if (content != pageindex[i]) {
            log("Website", content);
         }
      });
   }
   var loginreturn = false;

   function loginemptyreturn() {
      //log("Client", "ER2");
      if (!loginreturn) {
         log("Client", "E![LOGIN] No Return Recieved");
      }
   }
   String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
   };
   init();
});