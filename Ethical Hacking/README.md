Ethical Hacking

Link https://www.udemy.com/learn-ethical-hacking-from-scratch

# Install Kali

- Download Virtualbox
- Download Kali prebuild image https://www.offensive-security.com/kali-linux-vmware-virtualbox-image-download/ (ova extension)
- Download Virtualbox Extension Pack (for USB support)
- Don't forget to enable Virtualization in BIOS
- Import Kali machine in Virtualbox
- Settings: 1 GB of RAM is enough, 1 CPU is enough, Network use NAT Network (create a virtual ethernet network where host is router for virtual machine)
** sometimes you don't see a network name, you have to create it: VirtualBox > Preferences > Network > Click + sign
- Connect to Kali (root / toor)
- Take a snapshot: Tools > Snapshots > Take > Name / Description // Convenient if you mess something up or if you need to downgrade a library for example

# Virtual Machine to attack

* Windows virtual machine
* Metasploitable: vulnerable linux distro to test server attack, use the existing virtual disk downloaded (user and password msfadmin)

# Network Hacking

3 types:
* Preconnection Attacks (even before connecting to anything)
* Gaining Access (cracking wifi keys)
* Post-connection Attacks

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

## ARP SPOOFING ATTACKS

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

### Bypass HTTPS

* Previous attack only work agains HTTP requests, because data in HTTP is sent as plain text. MITM can thus read and edit requests and responses
* HTTPS encrypt HTTP using TLS (Transport Layer Security) or SSL (Secure Sockets Layer), very difficult to break
* Easiest solution is to downgrade HTTPS to HTTP, ie present the HTTP version of a website instead of the HTTPS version.
* Use SSLstrip, automatically loaded with mitmf
* NOTE: you need to lauch arpspoof and port forwarding alongside mitmf in order to be able to downgrade traffic
* Exception: website that use HSTS
        * HTTP Strict Transport Security
        * Used by Google, Facebook, Paypal ...
        * Modern browsers are hard-coded to only load a list of HSTS websites over https => no practical method to bypass at the moment

### DNS spoofing

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

### Capturing screen of target and inject keylogger

        mitmf --arp --spoof -i eth0 --target 10.0.2.4 --gateway 10.0.2.1 --screen

### Injecting custom JS or HTML code

        mitmf --arp --spoof -i eth0 --target 10.0.2.4 --gateway 10.0.2.1 --inject

* Code can be:
        * stored in a file --js-file or --html-file
        * stored online --js-url or --html-url
        * supplied through command line --js-payload or --html-payload

## Using mitmf against real network

* use the same way as before
* Check if Kali machine is only connected with one interface (disconnect ethernet interface)

## Wireshark and use with mitmf

* Wireshark is a network protocol analyser
* Designed to help network admin to keep track of what is happening in their network
* It logs packets that flow through the selected interface and analyse all packets
* It the case of a MITM attack, it only sniff packet that go through the attacker computer, not the network or the targeted machine itself

### Analyse packets

* open file or click on interface to listen to packet
* type "http" to filter http packets
* to get form data, filter with http and look for POST request and then HTTP form info
* Filter packet content via Edit > Find Packet > Packet Details > String
* Filter cookies via http.cookie, then use the cookie info to log in

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

## Server Side Attacks

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


