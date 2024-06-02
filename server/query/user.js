export const createUser = `
INSERT INTO users (id,username,first_name,last_name,email,password) VALUES(?,?,?,?,?,?)
`

export const getUserFromEmail = `
SELECT id FROM users WHERE deleted=0 AND email=?
`

export const getUserFromId = `
SELECT * FROM users WHERE deleted=0 AND id=?
`

export const getUserFromUsername = `
SELECT id FROM users WHERE deleted=0 AND username=?
`

export const getAllUser = `
SELECT * FROM users WHERE deleted=0;
`

export const deleteUserFromId = `
UPDATE users SET deleted=1 WHERE id=?
`