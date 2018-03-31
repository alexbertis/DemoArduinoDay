import time
import serial.tools.list_ports
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('ruta/del/archivo-de-admin.json')
app = firebase_admin.initialize_app(cred, {'databaseURL' : 'https://direccion-base-de-datos.firebaseio.com'})
ref = db.reference()
for puerto in serial.tools.list_ports.comports():
    if puerto.manufacturer == 'wch.cn':
        ser = serial.Serial(puerto.device)
        break

while True:
    snapshot = str(ref.get()).replace("'", '"')
    print(snapshot)
    ser.write(snapshot.encode())
    print(ser.read_all())
    time.sleep(2)

