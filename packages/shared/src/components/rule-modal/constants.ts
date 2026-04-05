export const RULE_MODAL_LABELS = {
  CREATE: "เพิ่มกฎใหม่",
  EDIT: "แก้ไขกฎ",
  RULE_NAME: "ชื่อกฎ",
  RULE_TYPE: "ประเภทกฎ",
  STATUS: "สถานะ",
  ENABLED: "เปิดใช้งาน",
  DISABLED: "ปิดใช้งาน",
  SAVE: "บันทึก",
  UPDATE: "อัพเดต",
  CANCEL: "ยกเลิก",
} as const;

export const RULE_TYPE_OPTIONS = {
  WEIGHT_TIER: {
    value: "WeightTier",
    label: "WeightTier (น้ำหนักตามช่วงราคา)",
  },
  TIME_WINDOW_PROMOTION: {
    value: "TimeWindowPromotion",
    label: "TimeWindowPromotion (โปรโมชั่นตามช่วงเวลา)",
  },
  REMOTE_AREA_SURCHARGE: {
    value: "RemoteAreaSurcharge",
    label: "RemoteAreaSurcharge (ค่าบวกพื้นที่ห่างไกล)",
  },
} as const;

export const RULE_MODAL_PLACEHOLDERS = {
  RULE_NAME: "กรอกชื่อกฎ",
} as const;
