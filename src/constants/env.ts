function readOptional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

// Ma phuong/xa (tuy chon) - khi dat, chi lay Tổ dân phố
// cua phuong nay tu cac endpoint cong khai.
export const WARD_CODE = readOptional(import.meta.env.VITE_WARD_CODE);

// Dia chi ung dung cu dan (tuy chon) - dung cho cac nut "tham gia khao sat
// tren ung dung cu dan". Khi khong dat thi chi hien chu, khong co lien ket.
export const RESIDENT_APP_URL = readOptional(import.meta.env.VITE_RESIDENT_APP_URL);
