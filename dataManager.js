const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var setDefault = function() {
	db.defaults({ devices: [], users: [], logs: [] })
  .write()
}

var rand = function() {
	return Math.random().toString(36).substr(2, 9)
}

module.exports = {
  devices: function() {
    let data = db.get('devices').value()
    return JSON.stringify(data)
  },
  users: function() {
    let data = db.get('users').value()
    return JSON.stringify(data)
  },
  logs: function() {

  },
  addUser: function(user) {
		if (db.get('users').find({ name: user.name }).size().value() != 0) {
			return 'Ошибка базы, такой пользователь существует'
		} else {
      let id = rand()
      addUserLog(id)
			db.get('users')
	  	.push({ id: id, name: user.name })
	  	.write()
			return '200\n'
		}
  },
  addDevice: function(device) {
		if (db.get('devices').find({ name: device.name }).size().value() != 0) {
			return 'Ошибка базы, такой девайс существует'
		} else {
      let id = rand()
      addDeviceLog(id)
			db.get('devices')
	  	.push({
				id: id,
				name: device.name,
	      serialNumber: device.serialNumber,
				os: {
					name: device.osName,
					version: device.osVersion,
				},
	      ownerId: ""
			})
	  	.write()
			return '200\n'
		}
  },
  deviceExist: function(id) {
    return db.get('devices').find({ id: id }).size().value() != 0
  },
  userExist: function(id) {
    return db.get('users').find({ id: id }).size().value() != 0
  },
  takeDevice: function(params) {
    takeDeviceLog(params.userId, params.deviceId)
    db
    .get('devices')
    .find({ id: params.deviceId })
    .assign({ ownerId: params.userId })
    .write()
    return '200\n'
  },
  putDevice: function(params) {
    putDeviceLog(params.deviceId)
    db
    .get('devices')
    .find({ id: params.deviceId })
    .assign({ ownerId: undefined })
    .write()
    return '200\n'
  }
}

var addDeviceLog = function(id) {
  addLog({ action: 'Добавлен девайс', deviceId: id })
}

var addUserLog = function(id) {
  addLog({ action: 'Добавлен пользователь', userId: id })
}

var removeUserLog = function(id) {
  addLog({ action: 'Удален пользователь', userId: id })
}

var removeDeviceLog = function(id) {
  addLog({ action: 'Удален девайс', userId: id })
}

var takeDeviceLog = function(userId, deviceId) {
  addLog({ action: 'Взял девайс', userId: userId, deviceId: deviceId })
}

var putDeviceLog = function(id) {
  addLog({ action: 'Положил девайс', deviceId: id })
}

var addLog = function(log) {
  db.get('logs')
  .push({
    id: rand(),
    userId: log.userId,
    deviceId: log.deviceId,
    action: log.action,
    time: new Date().getTime(),
  })
  .write()
  return '200\n'
}
