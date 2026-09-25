export const formatBDT = (amount: number): string => {
  return "৳" + Number(amount || 0).toLocaleString("en-US");
};

export const isValidBDPhone = (phone: string): boolean => {
  const clean = phone.replace(/[\s-]/g, "");
  return /^(\+?880|0)?1\d{9}$/.test(clean);
};

export const formatBDPhone = (phone: string): string => {
  const clean = phone.replace(/[\s-]/g, "");
  if (clean.length === 11 && clean.startsWith("01")) {
    return `${clean.slice(0, 5)}-${clean.slice(5)}`;
  }
  return phone;
};

export const generateWhatsAppLink = (message: string, phone: string = "8801852668468"): string => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const getWhatsAppLink = generateWhatsAppLink;

export const getMinDeliveryDate = (daysAhead: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
};
