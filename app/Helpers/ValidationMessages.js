const formatField = (field) => {
    return field.replace('_', ' ');
}
const ValidationMessages = {
    required: function (field, validation, args) {
      return `${formatField(field)}  is required`
    },
    unique: function (field, validation, args) {
        return `${formatField(field)} is already taken`
    },
    'email': 'Invalid email',
  }

module.exports = ValidationMessages;