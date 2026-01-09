const AuditLog = require("../models/AuditLog");

module.exports = async (company, action, performedBy) => {
  await AuditLog.create({
    company,
    action,
    performedBy
  });
};
