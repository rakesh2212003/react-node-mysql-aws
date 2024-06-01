export const createUser = `
INSERT INTO user (id,name,email,password) VALUES(?,?,?,?)
`

export const getIdFromEmail = `
SELECT id FROM user WHERE deleted=0 AND email=?
`

export const getUserFromId = `
SELECT name,email,password,avatar,created_on,updated_on FROM user WHERE deleted=0 AND id=?
`

export const getAllUser = `
SELECT name,email,password,avatar,created_on,updated_on FROM user WHERE deleted=0;
`

export const deleteUserFromId = `
UPDATE user SET deleted=1 WHERE id=?
`