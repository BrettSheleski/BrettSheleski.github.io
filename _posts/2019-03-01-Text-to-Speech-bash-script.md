---
layout: post
title:  "Text to Speech Bash Script"
description: "Script that automates the usage of a free online service to generate audio from text."
tags:
- Bash
- Text To Speech
- Linux
- Asterisk
- Chuck Norris Fact
- Cat Facts
- eSpeak
- ffmpeg
---


# Text to Speech Bash Script

For my home Asterisk Phone Server I wanted to create an extension which could dialed and get a random Chuck Norris fact recited to the caller.

At first I tried using tools like [espeak](http://espeak.sourceforge.net/) (and others) but found that the output audio was not very desirable and difficult to understand.  I then found several online text to speech services which provided pretty decent output.  One of which was [https://www.naturalreaders.com/online/](https://www.naturalreaders.com/online/).  After examining the network traffic in Chrome Developer Tools I found that the online form is simply doing an HTTP Post to a specific address resulting in a file download containing an mp3 file of the spoken text.

I wrote a bash script to automate this, <em>naturally</em>.

{% include github-gist.html id="BrettSheleski/a54bba8bca02bab0d7c023ff96575c12" %}

The script dumps the downloaded mp3 data to the standard output.  This is done so it can be easily piped to other programs to convert or do whatever with it.  Here is an example usage:

``` bash
echo "Hello World" | ./tts.sh > helloworld.mp3
```

## Chuck Norris

With the site [https://api.chucknorris.io/](https://api.chucknorris.io/) it was really easy to generate random Chuck Norris Fact mp3's.

``` bash
curl -s "https://api.chucknorris.io/jokes/random" | jq -r '.value' | ./tts.sh > chuckfact.mp3
```

## Integrating into Asterisk

Asterisk is able to playback an audio file but the audio format must be a gsm file.  Luckily ffmpeg is able to do the conversion necessary.

``` bash
curl -s "https://api.chucknorris.io/jokes/random" | jq -r '.value' | ./tts.sh | ffmpeg -loglevel quiet -i - -c:a libgsm -ar 8000 -ab 13000 -ac 1 -f gsm chuckfact.gsm
```

To get Asterisk to play a file it must be placed in the `/var/lib/asterisk/sounds/en/` directory.  So the above is modified to write to this file (overwriting if the file exists with the `-y` argument to ffmpeg). 

```bash
curl -s "https://api.chucknorris.io/jokes/random" | jq -r '.value' | ./tts.sh | ffmpeg -loglevel quiet -i - -c:a libgsm -ar 8000 -ab 13000 -ac 1 -f gsm -y /var/lib/asterisk/sounds/en/chuckfact.gsm
```

Then modified the extensions.conf file to call the script by first definine a context.

```conf
[ChuckNorrisFact]
exten => s,1,System(/var/lib/asterisk/scripts/chuckfact.sh /var/lib/asterisk/sounds/en/chuckfact.gsm)
 same => n,Playback(chuckfact)
 same => n,Return
```

Then an extension needs to be configured to call the context.  I used the number 24825 as that spells out CHUCK on the phone dialpad.

```conf
exten => 24825,1,Gosub(ChuckNorrisFact,s,1)
```