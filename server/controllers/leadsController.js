const { validateLeadPayload } = require('../utils/validation');
const { sendLeadNotification } = require('../services/emailService');

async function createLead(req, res, next) {
  const { lead, errors } = validateLeadPayload(req.body);

  if (errors.length) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  try {
    const emailResult = await sendLeadNotification(lead);

    return res.status(201).json({
      message: 'Lead received and notification sent successfully',
      lead,
      emailResult,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createLead,
};
