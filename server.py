import eventlet
import socketio

sio = socketio.Server()
# sio = socketio.Server(cors_allowed_origins='*')
# app = socketio.WSGIApp(sio, static_files={
#     '/': {'content_type': 'text/html', 'filename': 'index.html'}
# })

app = socketio.WSGIApp(sio, static_files = {
    # '/': 'voice.html',
    '/': 'index.html',
    '/static/script.js': 'static/script.js',
    '/static/style.css': 'static/style.css'
})

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def message(sid, data):
    print('message is ', data)

# @sio.on("message")
# def my_message(sid, data):
#     print('message is ', data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5500)), app)