# GTPS-discordbot
Whole make GTPS-discordbot tool with SkriptLang

![Owner](https://img.shields.io/badge/Owner-Pocan-orange?style=flat-square)
[![Discord](https://img.shields.io/badge/Discord-whWuXwaVwM-blue?style=flat-square)](https://discord.gg/aJDhZ34Tet)

# Install

1 - Download latest release

2 - Unzip it and throw it where you want

3 - Go to \plugins\GTPS-discordbot/ and open config.yml

4 - Put your discord bot token and your gtps server path

5 - After save it and go to main directory and run start.exe

# Functions

```applescript
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
```

## Commands

!stats
