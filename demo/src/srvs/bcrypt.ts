'use strict'

import * as bcrypt from 'bcrypt'

const saltRounds = 6

/**
 * 
 * @param myPlaintextPassword 明文密码
 * @param hash 加密密码
 */
export async function compare(myPlaintextPassword: string, hash: string) {
  return bcrypt.compare(myPlaintextPassword, hash);
}

/**
 * 
 * @param myPlaintextPassword 明文密码
 */
export async function genPassword(myPlaintextPassword: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);
  return hash
}


type typeServer = {
  compare: (myPlaintextPassword: string, hash: string) => Promise<boolean>
  genPassword: (myPlaintextPassword: string) => Promise<string>
}

export  {typeServer}