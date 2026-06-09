import { useState } from "react";
import { T, STATUS_META } from "../../constants/theme.js";
import { Input, Select, FieldLabel } from "../common/Input.jsx";
import { PrimaryBtn, GhostBtn } from "../common/Button.jsx";

const BLANK_FORM = {
  name: "", email: "", phone: "", company: "", budget: "",
  source: "LinkedIn", priority: "Medium", status: "new",
  assignedTo: "u1", notes: "", contact: "Email", lastActivity: "Just now",
};

function FormField({ label, name, type = "text", options, form, set }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel>{label}</FieldLabel>
      {options ? (
        <Select
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          options={options}
        />
      ) : (
        <Input
          type={type}
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          placeholder={`Enter ${label.replace(" *", "").toLowerCase()}`}
        />
      )}
    </div>
  );
}

export function AddLeadModal({ lead, team, onClose, onSave }) {
  const isEdit = !!lead?.id;
  const [form, setForm] = useState(isEdit ? lead : BLANK_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const statusOptions = Object.entries(STATUS_META).map(([v, m]) => ({ value: v, label: m.label }));
  const teamOptions   = team.map((t) => ({ value: t.id, label: t.name }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.card,
          border: `1px solid ${T.borderMed}`,
          borderRadius: 14,
          width: "100%",
          maxWidth: 548,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "18px 22px 16px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: T.card,
            zIndex: 1,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: "'Inter',sans-serif" }}>
              {isEdit ? "Edit lead" : "New lead"}
            </div>
            <div style={{ fontSize: 12, color: T.textHint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>
              {isEdit ? lead.company : "Add a lead to your pipeline"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: T.textHint, cursor: "pointer", padding: 6, borderRadius: 6, display: "flex" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: "20px 22px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <FormField label="Lead name *" name="name"       form={form} set={set} />
            <FormField label="Company *"  name="company"     form={form} set={set} />
            <FormField label="Email"      name="email"       type="email" form={form} set={set} />
            <FormField label="Phone"      name="phone"       form={form} set={set} />
            <FormField label="Budget"     name="budget"      form={form} set={set} />
            <FormField label="Source"     name="source"      options={["LinkedIn","Referral","Cold Email","Event","Website","Partner","Other"]} form={form} set={set} />
            <FormField label="Priority"   name="priority"    options={["High","Medium","Low"]} form={form} set={set} />
            <FormField label="Status"     name="status"      options={statusOptions} form={form} set={set} />
            <FormField label="Contact method" name="contact" options={["Email","Phone","LinkedIn","Video Call","In-Person"]} form={form} set={set} />
            <FormField label="Assigned to" name="assignedTo" options={teamOptions} form={form} set={set} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <FieldLabel>Notes</FieldLabel>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Additional context…"
              style={{
                width: "100%",
                background: T.input,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                padding: "9px 12px",
                color: T.text,
                fontSize: 13,
                outline: "none",
                resize: "vertical",
                fontFamily: "'Inter',sans-serif",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = T.borderFocus)}
              onBlur={(e) => (e.target.style.borderColor = T.border)}
            />
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn onClick={() => onSave(form)}>
              {isEdit ? "Save changes" : "Add lead"}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
