class BaseResModal {
  constructor (data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.data = message
    }
  }
}

class SuccessResModal extends BaseResModal {
  constructor (data, message) {
    super(data, message)
    this.success = true
  }
}

class ErrorResModal extends BaseResModal {
  constructor (data, message) {
    super(data, message)
    this.success = false
  }
}

module.exports = {
  SuccessResModal,
  ErrorResModal
}
