
var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var TodoItem_possibleTypes = ['TodoItem']
module.exports.isTodoItem = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTodoItem"')
  return TodoItem_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var BatchPayload_possibleTypes = ['BatchPayload']
module.exports.isBatchPayload = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBatchPayload"')
  return BatchPayload_possibleTypes.includes(obj.__typename)
}
