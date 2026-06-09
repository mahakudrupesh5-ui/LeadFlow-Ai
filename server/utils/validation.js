function validateLeadPayload(payload = {}) {
  const lead = {
    name: payload.name?.trim() || '',
    email: payload.email?.trim() || '',
    phone: payload.phone?.trim() || '',
    company: payload.company?.trim() || '',
    source: payload.source?.trim() || '',
  };

  const errors = [];

  if (!lead.name) {
    errors.push({ field: 'name', message: 'Name is required.' });
  }

  if (!lead.email) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
    errors.push({ field: 'email', message: 'Email must be valid.' });
  }

  if (!lead.phone) {
    errors.push({ field: 'phone', message: 'Phone is required.' });
  }

  if (!lead.company) {
    errors.push({ field: 'company', message: 'Company is required.' });
  }

  if (!lead.source) {
    errors.push({ field: 'source', message: 'Source is required.' });
  }

  return { lead, errors };
}

module.exports = {
  validateLeadPayload,
};
