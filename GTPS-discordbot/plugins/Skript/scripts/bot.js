# GTPS-discordbot coded by Pocan#4406
load:
	loadYAML()
	loginBOT()
	
import:
	ch.njol.skript.Skript
	java.io.File
	java.nio.file.Files
	java.lang.System	
	java.net.URL
	java.util.Scanner
	
expression (nl|new line|newline):
	return type: text
	get:
		return last character of System.lineSeparator()
	
expression [all] text[s] in [path] %string%:
	return type: object
	get:
		set {_text} to join ...Files.readAllLines(new File(expression-1).toPath()) by new line
		return {_text}
		
expression [all] file names in [path] %string%:
	return type: object
	get:
		set {_file} to new File(expression-1)
		loop ...{_file}.listFiles():
			add loop-value.getName() to {_return::*}
		return {_return::*}

expression htpp request from %string%:
	return type: strings
	get:
		set {_url} to new URL(expr-1)
		set {_connect} to {_url}.openConnection()
		{_connect}.setRequestMethod("GET")
		{_connect}.setConnectTimeout(5000)
		{_connect}.setReadTimeout(5000)
		set {_scanner} to new Scanner({_connect}.getInputStream())
		{_scanner}.useDelimiter("\A")
		return {_scanner}.next() if {_scanner}.hasNext() is true, else null

function loginBOT():
	login to yaml value "Options.Token" from "config" with name "GTPS-discordbot"	
	wait 1 ticks
	loop 300 times:
		send "" to console
	send "&aGTPS-discordbot &fdeveloped by &dPocan##4406" to console
	send "&dPocan's &fsupport discord server &chttps://discord.gg/aJDhZ34Tet" to console
	send "&8[&eWARNING&8] &fPlease write your server files path to value of Options.Path in plugins/GTPS-discordbot/config.yml" to console
	send "&8[&eWARNING&8] &fPlease write your bot token value of Options.Token in plugins/GTPS-discordbot/config.yml" to console

		
function loadYAML():
	load yaml "plugins/GTPS-discordbot/config.yml" as "config"
	if yaml "config" is empty:
		set yaml value "Options.Token" from "config" to ""
		set yaml value "Options.Path" from "config" to ""
		set yaml value "Options.Server-Name" from "config" to "Pocan's Server"
		set yaml value "Options.Server-Avatar-Link" from "config" to "https://media.discordapp.net/attachments/923981496275070976/933020866231545896/PROBLEME-AVEC-JAVA-SUR-WINDOWS-10.png"
		set yaml value "Botmark.Developer.Text" from "config" to "My developer: Pocan##4406"
		set yaml value "Botmark.Developer.Type" from "config" to "watching"
		set yaml value "Botmark.Online.Text" from "config" to "{online} players on the server"
		set yaml value "Botmark.Online.Type" from "config" to "playing"
		set yaml value "Botmark.Stats.Text" from "config" to "Stats: {worlds} worlds , {guilds} guilds , {players} accounts"
		set yaml value "Botmark.Stats.Type" from "config" to "playing"
		save yaml "config"

function getPlayers() :: object:
	set {_path} to yaml value "Options.Path" from "config"
	set {_player::*} to all file names in path "%{_path}%\save\players"
	return size of {_player::*}

function getWorlds() :: object:
	set {_path} to yaml value "Options.Path" from "config"
	set {_worlds::*} to all file names in path "%{_path}%\save\worlds"
	return size of {_worlds::*}	

function getGuilds() :: object:
	set {_path} to yaml value "Options.Path" from "config"
	set {_guilds::*} to all file names in path "%{_path}%\save\guilds"
	return size of {_guilds::*}	

function getOnline() :: object:
	set {_path} to yaml value "Options.Path" from "config"
	set {_online} to all text in path "%{_path}%\online_count.txt"
	return {_online}

function setBotmark(type : text, t : text):
	if {_type} = "watching":
		set presence of bot named "GTPS-discordbot" to watching "%{_t}%"
	if {_type} = "playing":
		set presence of bot named "GTPS-discordbot" to playing "%{_t}%"
		
every 45 seconds:
	loop yaml node keys "Botmark" from "config":
		set {_i} to loop-value
		add {_i} to {_i::*}
	set {_result} to random element out of {_i::*}
	set {_type} to yaml value "Botmark.%{_result}%.Type" from "config"
	set {_text} to yaml value "Botmark.%{_result}%.Text" from "config"
	
	set {_player} to getPlayers()
	set {_guild} to getGuilds()
	set {_worlds} to getWorlds()
	set {_online} to getOnline()
	
	replace all "{players}" in {_text} with "%{_player}%"
	replace all "{guilds}" in {_text} with "%{_guild}%"
	replace all "{worlds}" in {_text} with "%{_worlds}%"
	replace all "{online}" in {_text} with "%{_online}%"

	setBotmark("%{_type}%", "%{_text}%")	

discord command !stats:
	trigger:
		set {_servername} to yaml value "Options.Server-Name" from "config"
		set {_avatar} to yaml value "Options.Server-Avatar-Link" from "config"
		set {_player} to getPlayers()
		set {_guilds} to getGuilds()
		set {_worlds} to getWorlds()
		set {_online} to getOnline()
		set {_color} to color from rgb 0, 235, 235
		make embed:
			set title of embed to "%{_servername}%"
			set description of embed to "Statistic of %{_servername}%%nl%%nl%:sparkles: Online ??? %{_online}%%nl%:boom: Total created accounts ??? %{_player}%%nl%:fire: Total created worlds ??? %{_worlds}%%nl%:dash: Total created guilds ??? %{_guilds}%"
			set color of the embed to {_color}
#			set image of embed to "%{_avatar}%"
			set thumbnail of embed to "%{_avatar}%"
			set footer of embed to "Checked by %event-user%"
			set footer icon of embed to avatar of event-member
			set timestamp of embed to now
			reply with last embed
		
	
	
	
	
	
	
	
	
	
	
	
		
