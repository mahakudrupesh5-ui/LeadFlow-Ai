function generateLeadEmailTemplate(lead) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2>New Lead Added Successfully</h2>
      <p>A new lead has been added to the CRM system.</p>
      <h3>Lead Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${lead.name}</li>
        <li><strong>Email:</strong> ${lead.email}</li>
        <li><strong>Phone:</strong> ${lead.phone}</li>
        <li><strong>Company:</strong> ${lead.company}</li>
        <li><strong>Source:</strong> ${lead.source}</li>
      </ul>
      <p><strong>Status:</strong> Lead notification sent successfully.</p>
    </div>
  `;

  const text = `New Lead Added Successfully\n\n` +
    `A new lead has been added to the CRM system.\n\n` +
    `Lead Details:\n` +
    `- Name: ${lead.name}\n` +
    `- Email: ${lead.email}\n` +
    `- Phone: ${lead.phone}\n` +
    `- Company: ${lead.company}\n` +
    `- Source: ${lead.source}\n\n` +
    `Status: Lead notification sent successfully.`;

  return { html, text };
}

module.exports = {
  generateLeadEmailTemplate,
};
