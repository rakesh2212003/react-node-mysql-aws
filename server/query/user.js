export const createUser = `
INSERT INTO user (id,name,email,password) VALUES(?,?,?,?)
`

export const findEmail = `
SELECT * FROM user WHERE deleted=0 AND email=?
`

export const getUser = `
SELECT * FROM user WHERE deleted=0 AND id=?
`

export const getAllUser = `
SELECT name,email,avatar,created_on,updated_on FROM user WHERE deleted=0;
`

export const deleteUser = `
UPDATE user SET deleted=1 WHERE id=?
`