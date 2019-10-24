'use strict'
// const bcrypt = require('bcrypt')
const saltRounds = 6

module.exports = {
  /**
   * compare plain password and encrypted password
   * @param {String} password
   * @param {String} hash
   * @returns {Promise}
   */
  // compare(myPlaintextPassword, hash) {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
  //       // res == true
  //       resolve(res)
  //     });
  //   })
  // },
  /**
   * generate password and salt
   * @param {String} plain
   * @returns {Promise}
   */
  // genPassword(myPlaintextPassword) {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.genSalt(saltRounds, function (err, salt) {
  //       bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
  //         resolve({ salt, password: hash })
  //       });
  //     });
  //   })

  // }
}
