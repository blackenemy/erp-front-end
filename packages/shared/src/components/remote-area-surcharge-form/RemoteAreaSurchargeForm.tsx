import { Input, FormItem, Combobox } from "../../index";
import type {
  RemoteAreaSurchargeFormSectionProps,
} from "./types";
import {
  REMOTE_AREA_SURCHARGE_LABELS,
  REMOTE_AREA_SURCHARGE_PLACEHOLDERS,
} from "./constants";
import { THAI_POSTAL_CODES } from "../../data/postal-codes";
import styles from "./RemoteAreaSurchargeForm.module.css";

export default function RemoteAreaSurchargeFormSection({
  value,
  onChange,
  style,
}: RemoteAreaSurchargeFormSectionProps) {
  return (
    <div className={styles.formSection} style={style}>
      <FormItem label={REMOTE_AREA_SURCHARGE_LABELS.REMOTE_ZIP_PREFIXES}>
        <Combobox
          value={value.remoteZipPrefixes}
          onChange={(zips: string[]) =>
            onChange({
              ...value,
              remoteZipPrefixes: zips,
            })
          }
          options={THAI_POSTAL_CODES}
          placeholder="เลือกรหัสไปรษณีย์..."
          searchable={true}
          maxVisibleItems={100}
        />
        <div style={{ fontSize: "0.875rem", color: "#718096", marginTop: "0.25rem" }}>
          {value.remoteZipPrefixes.length > 0 && (
            <span>เลือกแล้ว {value.remoteZipPrefixes.length} รหัส</span>
          )}
        </div>
      </FormItem>
      <FormItem label={REMOTE_AREA_SURCHARGE_LABELS.SURCHARGE_FLAT}>
        <Input
          variant="filled"
          type="number"
          value={value.surchargeFlat}
          onChange={(e) =>
            onChange({ ...value, surchargeFlat: Number(e.target.value) })
          }
          placeholder={REMOTE_AREA_SURCHARGE_PLACEHOLDERS.SURCHARGE_FLAT}
        />
      </FormItem>
    </div>
  );
}
