const bcrypt = require('bcrypt')
const saltRounds = 10;

const encryptor = {};

encryptor.encrypt = data => {
  const hashed = bcrypt.hashSync(data, saltRounds, (err, hash) => {
    if (err) throw(err);
    return hash;
  })
  return hashed;
};

encryptor.compare = (data, hash) => {
  const isMatch = bcrypt.compareSync(data, hash, (err, isMatch) => {
    if (err) throw(err);
    return isMatch;
  })
  return isMatch;
}

module.exports = encryptor
