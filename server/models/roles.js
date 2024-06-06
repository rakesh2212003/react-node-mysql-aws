const roles = `
CREATE TABLE IF NOT EXISTS roles (
    id CHAR(36) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
)
`

export default roles;