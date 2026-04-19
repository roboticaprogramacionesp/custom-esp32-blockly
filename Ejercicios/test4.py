from machine import Pin, PWM
from time import sleep
import network
import time

import uasyncio as asyncio
import gc
import socket


pwm0 = PWM(Pin(0), freq=31, duty=512)
sleep((0 + 0))
pwm0.deinit()
sta_if  = network.WLAN(network.STA_IF)
sta_if .active(True)
sta_if .connect("MiWiFi", "12345678")
while not wlan.isconnected():
    time.sleep(0.5)
uart = BLEUART(ble, "P!t_Car_5")
