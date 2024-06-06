export const createUser = `
INSERT INTO users (id,username,first_name,last_name,email,password) VALUES(?,?,?,?,?,?)
`

export const getIdFromEmail = `
SELECT id FROM users WHERE deleted=0 AND email=?
`

export const getUserFromId = `
SELECT * FROM users WHERE deleted=0 AND id=?
`

export const getUserFromUsername = `
SELECT id FROM users WHERE deleted=0 AND username=?
`

export const updateUserFromId = `
UPDATE users SET first_name=?,last_name=?,email=? WHERE id=?
`

export const deleteUserFromId = `
UPDATE users SET deleted=1 WHERE deleted=0 AND id=?
`

//admin
export const getAllusers = `
SELECT * FROM users
`