export function getRoleForEmail(email?: string): "staff" | "user" {
    const staffEmails = process.env.STAFF_EMAILS?.split(",").map(e => e.trim()) ?? [];
    return staffEmails.includes(email ?? "") ? "staff" : "user";
  }
  