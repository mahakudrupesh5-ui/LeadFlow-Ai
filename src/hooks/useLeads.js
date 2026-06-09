import { useState } from "react";
import { SEED_LEADS } from "../data/leads.js";
import { STATUS_META } from "../constants/theme.js";
import { T } from "../constants/theme.js";

export function useLeads(setActivity, setNotifs) {
  const [leads, setLeads] = useState(SEED_LEADS);

  const addLead = (form) => {
    const newLead = { ...form, id: `l${Date.now()}`, lastActivity: "Just now" };
    setLeads((ls) => [newLead, ...ls]);
    setActivity((a) => [
      { id: `a${Date.now()}`, text: `New lead added: ${form.name} (${form.company})`, time: "Just now", color: T.purple },
      ...a,
    ]);
    setNotifs((n) => [
      { id: `n${Date.now()}`, text: `New lead added: ${form.name}`, time: "Just now", read: false, icon: "plus" },
      ...n,
    ]);
  };

  const updateLead = (form) => {
    setLeads((ls) => ls.map((l) => (l.id === form.id ? form : l)));
  };

  const moveLead = (leadId, newStatus) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.status === newStatus) return;
    const label = STATUS_META[newStatus].label;
    setLeads((ls) =>
      ls.map((l) => (l.id === leadId ? { ...l, status: newStatus, lastActivity: "Just now" } : l))
    );
    setActivity((a) => [
      { id: `a${Date.now()}`, text: `Lead moved: ${lead.name} → ${label}`, time: "Just now", color: STATUS_META[newStatus].color },
      ...a,
    ]);
  };

  const filterLeads = ({ search = "", status = "all", priority = "all", member = "all" }) => {
    return leads.filter((l) => {
      if (search && !(l.name + l.company + l.email).toLowerCase().includes(search.toLowerCase())) return false;
      if (status !== "all" && l.status !== status) return false;
      if (priority !== "all" && l.priority !== priority) return false;
      if (member !== "all" && l.assignedTo !== member) return false;
      return true;
    });
  };

  return { leads, addLead, updateLead, moveLead, filterLeads };
}
