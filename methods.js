const data = require('./dataManager');

module.exports = {
   getDevices: function() {
      return data.devices();
   },
   getUsers: function() {
     return data.users();
   },
   addUser: function(params) {
     if (params.name != undefined) {
       return data.addUser(params)
     }
     return 'Ошибка метода, не распарсил\n'
   },
   addDevice: function(params) {
     if (
       params.name != undefined &&
       params.osName != undefined &&
       params.osVersion != undefined &&
       params.serialNumber != undefined
     ) {
       return data.addDevice(params)
     }
     return 'Ошибка метода, не распарсил\n'
   },
   takeDevice: function(params) {
     if (data.deviceExist(params.deviceId) && data.userExist(params.userId)) {
       return data.takeDevice(params)
     } else {
       return 'Ошибка методов, айди девайса или юзера не найдены'
     }
   },
   putDevice: function(params) {
     if (data.deviceExist(params.deviceId)) {
       return data.putDevice(params)
     } else {
       return 'Ошибка методов, айди девайса не найден'
     }
   }
}
