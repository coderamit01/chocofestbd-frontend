import type { EditableSettingGroup, ImageSettingGroup, SettingValues } from "@/types/setting";

export type SectionProps<G extends EditableSettingGroup> = {
  value: SettingValues[G];
  onChange: (patch: Partial<SettingValues[G]>) => void;
  errorFor: (path: string) => string | undefined;
};

export type ImageUploadHandler = (group: ImageSettingGroup, field: string, file: File) => void;
