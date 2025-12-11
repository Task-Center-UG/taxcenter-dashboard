# Tax Volunteer Documentation Feature

## Overview

Fitur dokumentasi Tax Volunteer memungkinkan pengelolaan dokumentasi kegiatan relawan pajak dengan tampilan catalog/gallery yang menggunakan grid layout untuk menampilkan gambar-gambar dokumentasi. Setiap user hanya dapat melihat dokumentasi yang mereka buat sendiri (filtered by user_id).

## Workflow

1. **Create Documentation**: User membuat dokumentasi dengan mengisi title, date, location + upload images dalam satu halaman
2. **API Process**:
   - Step 1: POST ke `/tax-volunteer-documentation` → mendapat `id` dokumentasi
   - Step 2: Loop upload setiap gambar ke `/tax-volunteer-documentation/:id/file`
3. **List View**: Menampilkan dokumentasi milik user (filtered by `user_id`) dalam grid catalog

## Features

### 1. **List Documentation** (`/relawan-pajak/dokumentasi`)

- Menampilkan dokumentasi milik current user (filtered by `user_id`)
- Setiap dokumentasi menampilkan:
  - Title, Date, Location
  - Nama creator (full_name dari User)
  - Grid 2 kolom untuk gambar-gambar dokumentasi
- Fitur pagination untuk navigasi data
- Delete gambar langsung dari preview modal dengan konfirmasi
- Tombol aksi: View, Edit, dan Upload

### 2. **Create Documentation** (`/relawan-pajak/dokumentasi/create`)

- **Single page form** untuk membuat dokumentasi + upload images sekaligus
- Field yang tersedia:
  - **Title** (required): Judul dokumentasi
  - **Date** (optional): Tanggal kegiatan
  - **Location** (optional): Lokasi kegiatan
  - **Images** (optional, multiple): Upload multiple gambar (JPG, JPEG, PNG)
- Process flow:
  1. Create dokumentasi → mendapat ID
  2. Upload semua gambar secara sequential menggunakan ID tersebut
  3. Redirect ke list page

### 3. **Edit Documentation** (`/relawan-pajak/dokumentasi/edit/[id]`)

- Form untuk mengedit dokumentasi yang sudah ada
- Pre-filled dengan data dokumentasi saat ini
- Field yang dapat diubah: Title, Date, Location
- Tidak termasuk edit gambar (gunakan Upload page)

### 4. **Upload Images** (`/relawan-pajak/dokumentasi/upload/[id]`)

- Upload gambar tambahan untuk dokumentasi tertentu
- Menggunakan **ReusableUploadZone** dengan format:
  - JPG/JPEG
  - PNG
- Menampilkan preview gambar yang sudah diupload
- Grid 2 kolom untuk menampilkan gambar
- Fitur delete per gambar dengan konfirmasi dalam modal preview

### 5. **View Detail** (`/relawan-pajak/dokumentasi/detail/[id]`)

- Menampilkan detail lengkap dokumentasi
- Informasi metadata: Created by (full_name), Updated at, Total images
- Gallery gambar dengan grid 2 kolom
- Delete gambar langsung dari modal preview
- Tombol aksi: Delete Documentation, Edit, Upload Images

## Components

### Custom Components

1. **ImagePreviewWithDelete**
   - Preview gambar dengan aspect ratio 16:9
   - Modal untuk melihat gambar lebih jelas
   - Fitur delete dengan konfirmasi dalam modal
   - Hover effect untuk interaksi yang lebih baik

### Custom Hooks

1. **useTaxVolunteerDocumentation**
   - Mengelola semua operasi CRUD untuk dokumentasi
   - Functions:
     - `createDocumentation`: Membuat dokumentasi baru
     - `updateDocumentation`: Update dokumentasi
     - `deleteDocumentation`: Hapus dokumentasi
     - `uploadFile`: Upload gambar
     - `deleteFile`: Hapus gambar

## API Endpoints

```
POST   /api/v1/tax-volunteer-documentation          - Create documentation
GET    /api/v1/tax-volunteer-documentation          - List documentations
GET    /api/v1/tax-volunteer-documentation/:id      - Get documentation detail
PUT    /api/v1/tax-volunteer-documentation/:id      - Update documentation
DELETE /api/v1/tax-volunteer-documentation/:id      - Delete documentation
POST   /api/v1/tax-volunteer-documentation/:id/file - Upload image
DELETE /api/v1/tax-volunteer-documentation/file/:id - Delete image
```

## File Structure

```
src/
├── app/relawan-pajak/dokumentasi/
│   ├── page.tsx                    # List documentation
│   ├── create/
│   │   └── page.tsx               # Create documentation
│   ├── edit/[id]/
│   │   └── page.tsx               # Edit documentation
│   ├── upload/[id]/
│   │   └── page.tsx               # Upload images
│   └── detail/[id]/
│       └── page.tsx               # View detail
├── components/image/
│   └── ImagePreviewWithDelete.tsx  # Image preview with delete
├── hooks/
│   └── useTaxVolunteerDocumentation.ts # Custom hook
└── store/
    └── TaxVolunteerDocumentation.ts    # Type definitions
```

## Usage Example

### Creating New Documentation

1. Navigate to `/relawan-pajak/dokumentasi`
2. Click "Add New" button
3. Fill in the form (Title is required)
4. Click "Create"

### Uploading Images

1. From the list, click "Upload" button
2. Use drag & drop or click to select images (JPG, JPEG, PNG only)
3. Click "Upload" to save
4. Images will appear in grid layout

### Deleting Images

1. Click on any image to open preview modal
2. Click the trash icon in the modal
3. Confirm deletion
4. Image will be removed immediately

## Key Features

- ✅ CRUD operations for documentation
- ✅ Image upload with drag & drop
- ✅ Grid layout (2 columns) for images
- ✅ Image preview with modal
- ✅ Delete images with confirmation
- ✅ Pagination support
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Only accept image formats (JPG, JPEG, PNG)
