#!/usr/bin/python

# Start by importing the libraries we want to use
import Adafruit_DHT
import os

import RPi.GPIO as GPIO # This is the GPIO library we need to use the GPIO pins on the Raspberry Pi
import smtplib # This is the SMTP library we need to send the email notification
import time # This is the time library, we need this so we can use the sleep function
state=0
# This is our sendEmail function


sensor = Adafruit_DHT.DHT11
pin = 4
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

print humidity, temperature
os.system("node submit-sensor-data.js 0 0 " + str(humidity) + " " + str(temperature) +" 0")


from sys import argv
import gps
import requests

#Listen on port 2947 of gpsd
#session = gps.gps("localhost", "2947")
#session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)

#while True :
#        rep = session.next()
 #       try :
#            if (rep["class"] == "TPV") :
#             		print(str(rep.lat) + "," + str(rep.lon))
#              
#        except Exception as e :
#            print("Got exception " + str(e))

# This is our callback function, this function will be called every time there is a change on the specified GPIO channel, in this example we are using 17

def callback(channel):  
	if GPIO.input(channel):
		#print "LED off"
		state=0
	else:
		#print "LED on"
		state=1
		
	print state
	os.system("node submit-sensor-data.js 0 0 " + str(humidity) + " " + str(temperature) +" " + str(state))

# Set our GPIO numbering to BCM
GPIO.setmode(GPIO.BCM)

# Define the GPIO pin that we have our digital output from our sensor connected to
channel = 17
# Set the GPIO pin to an input
GPIO.setup(channel, GPIO.IN)

# This line tells our script to keep an eye on our gpio pin and let us know when the pin goes HIGH or LOW
GPIO.add_event_detect(channel, GPIO.BOTH, bouncetime=300)
# This line asigns a function to the GPIO pin so that when the above line tells us there is a change on the pin, run this function
GPIO.add_event_callback(channel, callback)

# This is an infinte loop to keep our script running
while True:
	# This line simply tells our script to wait 0.1 of a second, this is so the script doesnt hog all of the CPU
	time.sleep(0.1)
	

	
	
	
	


