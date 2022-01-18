# DiSky
Whole remake of the original Vixio project, which allows Skript to interact with Discord bot.

![License](https://img.shields.io/github/license/SkyCraft78/DiSky?style=flat-square)
![Owner](https://img.shields.io/badge/Owner-ItsTheSky-orange?style=flat-square)
[![Discord](https://img.shields.io/badge/Discord-whWuXwaVwM-blue?style=flat-square)](https://discord.gg/whWuXwaVwM)

# Links

* [Documentation](https://disky.itsthesky.info/?page=docs)
* Wiki _(Soon)_
* [Discord](https://discord.gg/whWuXwaVwM)
* [Download](https://github.com/SkyCraft78/DiSky3/releases/)

# Basic Usage

DiSky is here to help Bot management with Skript.
First, you **must** know basics of both __Skript__ and __Discord Bot__ system.

No help will be given if you are asking for basic features!

## Loading

After creating your bot, create a new script file and enter the default login code:

```applescript
on load:
	make new bot:
		enable all default intents
		login to "TOKEN" with name "NAME"
		set online status of bot "NAME" to do not disturb # > Or either online, idle, offline
		set presence of bot "NAME" to watching "the beautiful DiSky v3 >:D" # > Or check for futher presence on the docs
```

## Creating Discord Command

Discord command are made via DiSky and are fired when anyone types a specific message.
DiSky will by itself parse every argument and execute the given code.

```applescript
discord command whois <member>:
	prefixes: !
	trigger:
		make embed:
			set author of embed to "Who is %arg-1% ?"
			set author icon of embed to avatar of event-guild
			add "`•` __Name:__ %arg-1%" to {_l::*}
			add "`•` __Nickname:__ %discord nick name of arg-1%" to {_l::*}
			add "`•` __Discord ID:__ %id of arg-1%" to {_l::*}
			add "`•` __Avatar URL:__ [Click!](%avatar of arg-1%)" to {_l::*}
			set {_b::*} to badges of arg-1
			if {_b::*} is not set:
				set {_b::*} to "None"
			add "`•` __Badges:__ %{_b::*}%" to {_l::*}
			add "`•` __Creation date__ %create date of arg-1%" to {_l::*}
			add "`•` __Join date__ %join date of arg-1%" to {_l::*}
			set description of embed to join {_l::*} with nl
			set color of embed to orange
			set thumbnail of embed to avatar of arg-1
		reply with last embed
```
 
 ## Creating Slash Command
 
 Slash command are considered as interaction, and DiSky will by itself register them **globally** or **per guilds**:
 
 ```applescript
 # > Slash command now works like discord command, and DiSky manage itself the registring on Discord.

# > If you only specify guilds (IDs or names), DiSky will register slash commands in these guilds (no wait cooldown)
# > If you only specify bots (names), DiSky will register slash commands in the bot (globally) and will take up to an hour to be updated.

# > Possible argument are from the slash command types, not discord command arguments.
# > You can use:
# -> string
# -> integer
# -> boolean
# -> user
# -> channel
# -> role
# -> number

slash command ban <user> [<string>] [<boolean>]:

	# > This new feature regroup options needed for arguments.
	# > They are from first to last, aka 1 represent "user", 2 represent "string" in our case.
	# > You can specify:
	# REQUIRE -> 'name', the argument name without space allowed.
	# REQUIRE -> 'description', the argument description with space allowed
	# OPTIONAL -> 'default values', list of values, only working for STRING & INTEGER option, to show to the user.
	options:
		1:
			name: target
			description: The target user
		2:
			name: reason
			description: The reason of banning
			# > Default values will be presented with a name and, of course, a value.
			# > They ONLY WORK with STRING and INTEGER.
			# > The name represent the default value name shown to the user on the argument selection.
			# > The value represent the value that will get the argument expression in the command (arg 2 here)
			default values:
				1:
					name: Spamming
					value: Banned for spamming in channels
				2:
					name: Hacking
					value: Banned for hacking some one / the server (tried)
				3:
					name: Disrespecting
					value: Banned for disrespecting some one or the whole server
				4:
					name: Additional Warns
					value: Banned for multiple warns one after one
				5:
					name: Additional Warns
					value: Banned for multiple warns one after one
		3:
			name: tagged
			description: If the reason sould either include your name or not.
	
	# > The slash command description show in the Discord "/" menu.
	description: Ban a sepcific user from the guild.
	
	# > The guilds (IDs or names) where DiSky have to register the command.
	# > You can replace this by 'bots: myName' to register the command globally.
	guilds: 818182471140114432
	
	trigger:
		
		# > There's no member as argument (fuck discord), we have to parse ourselves the member in event-guild.
		retrieve member with id discord id of event-user and store it in {_event-member}
		retrieve member with id discord id of arg 1 and store it in {_target-member}
		
		# > Should never happen if the command is executed in a guild, but in case of anything x)
		{_event-member} is set
		{_target-member} is set

		if {_event-member} don't have discord permission administrator:
			reply with hidden ":x: **Oh no, you don't have the permission to do that :(**"
			stop
		
		set {_reason} to arg-2
		if {_reason} is set:
			if arg 3 is true:
				set {_reason} to "%{_reason}% - By %discord name of event-user%"
			ban {_target-member} with reason {_reason}
		else:
			if arg 3 is true:
				ban {_target-member} with reason "Banned by %discord name of event-user%"
			else:
				ban {_target-member}

		reply with hidden ":v: **%mention tag of {_target-member}% has been banned from %discord name of event-guild%!**"
 ```
