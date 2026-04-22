import network
import uasyncio as asyncio
import gc
import socket

k = None
v = None

class DNSQuery:
  def __init__(self, data):
    self.data = data

  def response(self, ip):
    packet = self.data[:2] + b"\x81\x80"
    packet += self.data[4:6] + self.data[4:6]
    packet += b"\x00\x00\x00\x00"
    packet += self.data[12:]
    packet += b"\xC0\x0C"
    packet += b"\x00\x01\x00\x01\x00\x00\x00\x3C\x00\x04"
    packet += bytes(map(int, ip.split(".")))
    return packet

async def run_dns_server():
  udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
  udp.setblocking(False)
  udp.bind(("0.0.0.0", 53))
  while True:
    try:
      data, addr = udp.recvfrom(1024)
      q = DNSQuery(data)
      udp.sendto(q.response(SERVER_IP), addr)
    except:
      await asyncio.sleep_ms(10)

PAGE = 'index2'
async def handle_http(reader, writer):
  gc.collect()
  line = await reader.readline()
  if not line:
    return
  try:
    method, path, proto = line.decode().split()
  except:
    return
  while True:
    hdr = await reader.readline()
    if hdr == b"\r\n":
      break

  try:
    page = PAGE
    if "?" in path:
      query = path.split("?",1)[1]
      for p in query.split("&"):
        if "=" in p:
          k,v = p.split("=")
          print(k, v)
          comandos(k, v)
    if not page.endswith(".html"):
      page += ".html"
    with open(page) as f:
      html = f.read()
    await writer.awrite("HTTP/1.0 200 OK\r\n")
    await writer.awrite("Content-Type: text/html; charset=utf-8\r\n\r\n")
    await writer.awrite(html)
  except:
    await writer.awrite("HTTP/1.0 500 ERROR\r\n\r\nError al abrir pagina")
  await writer.aclose()

async def portal_main():
  wifi_start_access_point()
  asyncio.create_task(run_dns_server())
  await asyncio.start_server(handle_http, "0.0.0.0", 80)
  while True:
    await asyncio.sleep(1)

# Describe esta función...
def comandos(k, v):
  print(k)
  print(v)


# Configuración Punto de Acceso
SERVER_SSID = "Control-PitCar"
PASSWORD = ""
SERVER_IP = "192.168.0.1"
SERVER_SUBNET = "255.255.255.0"

def wifi_start_access_point():
  ap = network.WLAN(network.AP_IF)
  ap.active(True)
  ap.ifconfig((SERVER_IP, SERVER_SUBNET, SERVER_IP, SERVER_IP))
  ap.config(essid=SERVER_SSID, authmode=network.AUTH_OPEN)
  print("AP iniciado:", ap.ifconfig())

asyncio.run(portal_main())