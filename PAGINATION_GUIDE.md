# Pagination Implementation Guide

## Overview

Sistem pagination telah dibuat dengan komponen dan hooks yang reusable.

## Components Created

### 1. Pagination Component

`src/components/pagination/Pagination.tsx`

- Menampilkan pagination UI
- Menampilkan info "Showing X to Y of Z entries"
- Auto-hide jika total_pages <= 1

### 2. Updated ReusableTable

`src/components/table/ReusableTable.tsx`

- Tambahan props: `paging` dan `onPageChange`
- Otomatis render Pagination component jika props tersedia

### 3. useQueryWithPagination Hook

`src/hooks/useQueryWithPagination.ts`

- Handle pagination dengan URL query params
- Default: page=1, size=10
- Auto-fetch saat page/size berubah
- Return: `data`, `isLoading`, `error`, `handlePageChange`, `handleSizeChange`

## Implementation Steps

### Step 1: Update Store Type

Add `paging` field to your collection interface:

```typescript
import { PagingInfo } from "@/types/pagination";

export interface YourCollections {
  items: YourItem[];
  paging?: PagingInfo; // Add this
}
```

### Step 2: Update Page Component

Replace `useQuery` with `useQueryWithPagination`:

**Before:**

```typescript
import { useQuery } from "@/hooks/useQuery";

const { data: items, isLoading } = useQuery<YourCollections>("your-endpoint");

<ReusableTable
  columns={columns}
  data={items?.items ?? []}
  isLoading={isLoading}
/>;
```

**After:**

```typescript
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";

const {
  data: items,
  isLoading,
  handlePageChange,
} = useQueryWithPagination<YourCollections>("your-endpoint");

<ReusableTable
  columns={columns}
  data={items?.items ?? []}
  isLoading={isLoading}
  paging={items?.paging}
  onPageChange={handlePageChange}
/>;
```

## API Response Format

Backend harus return format ini:

```json
{
  "status": "OK",
  "code": 200,
  "data": {
    "items": [...],
    "paging": {
      "page": 1,
      "total_pages": 5,
      "total_items": 50
    }
  }
}
```

## Query Parameters

- `page`: Current page number (default: 1)
- `size`: Items per page (default: 10)
- `title`: Search/filter (optional)
- `category`: Filter by category (optional)
- `sort_by`: Sort field (optional)
- `order`: Sort order asc/desc (optional)

## Example: Fully Implemented

See: `src/app/(private)/program/tax-clinic/info-edukasi/page.tsx`

## List of Files to Update

### Priority 1 - Main Lists with Pagination

1. `/beranda/hero-slider/page.tsx`
2. `/beranda/penghargaan/page.tsx`
3. `/galeri/foto-kegiatan/page.tsx`
4. `/edukasi/materi/page.tsx`
5. `/edukasi/video/page.tsx`
6. `/edukasi/podcast/page.tsx`
7. `/kegiatan/artikel/page.tsx`
8. `/kegiatan/publikasi/page.tsx`
9. `/kegiatan/agenda/slider/page.tsx`
10. `/kegiatan/agenda/terbaru/page.tsx`
11. `/program/relawan-pajak/modul/page.tsx`
12. `/program/relawan-pajak/dokumentasi/page.tsx`
13. `/program/pengabdian/pendampingan-umkm/page.tsx`
14. `/program/pengabdian/pelatihan-umkm/page.tsx`
15. `/program/pengabdian/foto-produk-umkm/page.tsx`
16. `/program/riset/kategori/page.tsx`
17. `/program/riset/kerja-sama/page.tsx`
18. `/program/riset/program-kegiatan/page.tsx`
19. `/program/tax-clinic/info-edukasi/page.tsx` ✅ DONE
20. `/tentang-kami/anggota/page.tsx`
21. `/tentang-kami/divisi/page.tsx`
22. `/tentang-kami/mitra/page.tsx`

## Notes

- Pagination component auto-hides if only 1 page
- URL params persist across page refreshes
- Back button works correctly
- Size change resets to page 1
