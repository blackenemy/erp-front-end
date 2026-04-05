export const PRICE_CALCULATOR_FORM_LABELS = {
  WEIGHT: "น้ำหนัก (kg)",
  ORIGIN_ZIP: "รหัสไปรษณีย์ต้นทาง",
  DESTINATION_ZIP: "รหัสไปรษณีย์ปลายทาง",
  CALCULATE: "คำนวณราคา",
} as const;

export const PRICE_RESULT_LABELS = {
  TITLE: "ผลการคำนวณราคา",
  BASE_PRICE: "ราคาพื้นฐาน",
  DISCOUNT: "ส่วนลด",
  SURCHARGE: "ค่าบวกพิเศษ",
  FINAL_PRICE: "ราคาสุดท้าย",
} as const;

export const PLACEHOLDERS = {
  WEIGHT: "กรอกน้ำหนัก",
  ORIGIN_ZIP: "เช่น 10100",
  DESTINATION_ZIP: "เช่น 95120",
} as const;
