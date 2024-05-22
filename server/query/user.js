export const createUser = `
INSERT INTO user (id,firstname,lastname,email,password,avatar) VALUES(?,?,?,?,?,?)
`

export const findEmail = `
SELECT * FROM user WHERE deleted=0 AND email=?
`

// export const getUserQuery = `
// SELECT username,firstname,lastname,email,created_on,updated_on FROM user WHERE deleted=0 AND id=?
// `

// export const getAllUserQuery = `
// SELECT username,firstname,lastname,email,created_on,updated_on FROM user WHERE deleted=0;
// `

// export const deleteUserQuery = `
// UPDATE user SET deleted=1 WHERE id=?
// `