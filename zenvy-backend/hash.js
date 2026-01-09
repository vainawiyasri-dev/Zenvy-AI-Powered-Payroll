const bcrypt = require("bcryptjs");

(async () => {
  const hash = await bcrypt.hash("hr123", 10);
  console.log(hash);
})();
