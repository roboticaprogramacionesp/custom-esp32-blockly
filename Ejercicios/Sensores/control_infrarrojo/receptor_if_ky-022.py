from machine import Pin
from ir_rx import NEC_8, NEC_16

data = None
addr = None
ctrl = None

def ir_callback(data, addr, ctrl):
  if data > 0:
    print(data)


ir4 = NEC_8(Pin(4, Pin.IN, Pin.PULL_UP), ir_callback)
