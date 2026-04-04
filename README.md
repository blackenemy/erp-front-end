# ERP Front-end

แอปพลิเคชัน ERP front-end สมัยใหม่ที่สร้างด้วย Next.js 14, React 18 และ TypeScript โดยปฏิบัติตามสถาปัตยกรรม monorepo ด้วย pnpm workspaces

## 📁 โครงสร้างโปรเจกต์

```
erp-front-end/
├── apps/
│   └── erp/                   # แอปพลิเคชัน Next.js หลัก
│       ├── src/
│       │   └── app/
│       ├── package.json
│       ├── next.config.js
│       └── tsconfig.json
├── packages/
│   └── shared/                # Shared components, hooks, utilities และ APIs
│       └── src/
│           ├── components/
│           │   ├── badge/
│           │   ├── button/
│           │   ├── card/
│           │   ├── form/
│           │   ├── form-weight-tier/
│           │   ├── input/
│           │   ├── layout/
│           │   ├── modal/
│           │   ├── skeleton/
│           │   └── table/
│           ├── api/
│           │   ├── quotes/
│           │   └── rules/
│           ├── hooks/
│           │   └── api/
│           ├── config/
│           ├── contexts/
│           ├── layouts/
│           ├── lib/
│           ├── locales/
│           ├── types/
│           ├── utils/
│           ├── vendor/
│           └── index.ts
├── pnpm-workspace.yaml
├── package.json
├── turbo.json
├── tsconfig.json
└── README.md
```

## 🚀 Script ที่มีอยู่

### ระดับ Root

```bash
pnpm dev          # เริ่มแอปทั้งหมดในโหมด development
pnpm build        # Build ทุก packages และ apps
pnpm lint         # Lint ทุก packages และ apps
pnpm typecheck    # Type check ทุก packages และ apps
pnpm clean        # ล้างผลลัพธ์และ dependencies ทั้งหมด
```

### ERP app

```bash
cd apps/erp
pnpm dev          # เริ่ม Next.js development server
pnpm build        # Build สำหรับ production
pnpm start        # เริ่ม production server
pnpm lint         # รัน ESLint
```

## 🎨 Components ที่มีอยู่

ทุก components อยู่ใน `packages/shared/src/components/` และปฏิบัติตามรูปแบบที่สอดคล้องกัน:

### Button

Variants: primary, secondary, tertiary, danger
Sizes: sm, md, lg
Features: loading state, full width

### Input

Variants: default, outlined, filled
Features: label, error, helper text, icons

### Card

Variants: default, outlined, elevated, flat
Sizes: sm, md, lg
Features: image, title, description, clickable

### Modal

Sizes: sm, md, lg, xl, full
Features: close on overlay/escape, custom footer

### Badge

Variants: default, primary, success, warning, danger, info
Sizes: sm, md, lg
Features: dot, count badge

### Skeleton

Variants: text, circular, rectangular, rounded
Features: multiple count, custom dimensions

### Table

Features: sortable columns, pagination, row click, empty state

### Form

Layouts: vertical, horizontal, inline
Features: validation, error states, help text

### FormWeightTier

Custom component สำหรับการกำหนดค่า weight tier
Features: dynamic tier management, weight ranges

### Layout

Components: Layout, Layout.Sider, Layout.Header, Layout.Content, Layout.Footer
Features: collapsible sidebar, fixed header, responsive

## 🏗️ สถาปัตยกรรม

โปรเจกต์นี้ปฏิบัติตามข้อตกลง ERP Architecture:

1. **page.tsx** (Server Component) → นำเข้าเฉพาะ Screen
2. **Screen Component** → อาจมี Containers
3. **Container Components** (Stateful) → เรนเดอร์ Presenters
4. **Presenter Components** (Stateless) → UI เท่านั้น
5. **Shared Components** → นำกลับมาใช้ในทั้ง modules

### กฎการ Import

✅ **อนุญาต:**

- Module ใดก็ได้สามารถ import จาก `@repo/shared`
- ภายใน module เดียวกัน imports มีอิสระ

❌ **ห้าม:**

- Cross-module imports ระหว่าง apps
- Importing private containers จาก modules อื่น

## 🔗 API Integration

โปรเจกต์มี API utilities ใน `packages/shared/src/api/`:

### Quotes API

- `calculate-price.ts` - คำนวณราคา quote
- `submit-bulk-quotes.ts` - ส่ง quotes หลายรายการ
- `get-job-status.ts` - ดึงสถานะการประมวลผล job

### Rules API

- `get-rules.ts` - ดึงข้อมูล rules ทั้งหมด
- `get-rule.ts` - ดึงข้อมูล rule เฉพาะ
- `create-rule.ts` - สร้าง rule ใหม่
- `update-rule.ts` - อัปเดต rule ที่มีอยู่
- `delete-rule.ts` - ลบ rule

## 📦 การติดตั้ง

```bash
# ติดตั้ง dependencies
pnpm install

# เริ่ม development server
pnpm dev
```

## 🔧 การพัฒนา

โปรเจกต์ใช้:

- **Next.js 14** สำหรับ framework แอปพลิเคชัน
- **React 18** สำหรับ UI components
- **TypeScript 5** สำหรับ type safety
- **pnpm** สำหรับ package management
- **Turbo** สำหรับ build system
- **CSS Modules** สำหรับ styling

## 📝 การสร้าง Component

ในการสร้าง components ใหม่ ให้ปฏิบัติตามรูปแบบที่กำหนด:

1. สร้างโฟลเดอร์ component: `packages/shared/src/components/[component-name]/`
2. สร้าง 6 ไฟล์:
   - `[ComponentName].tsx` - Main component
   - `[ComponentName].module.css` - Styles
   - `types.ts` - TypeScript types
   - `constants.ts` - Constants
   - `helpers.ts` - Helper functions
   - `index.ts` - Exports

## 🎯 ขั้นตอนต่อไป

- ขยาย API integration ด้วย custom hooks
- สร้าง business logic containers
- เพิ่ม shared utilities เพิ่มเติม
- ตั้งค่าโครงสร้าง routing ที่เหมาะสม
- เพิ่ม form validation utilities

## 📄 License

Private project for internal use
