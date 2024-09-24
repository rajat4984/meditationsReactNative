export interface AffirmationCategory {
  title: String;
  data: GalleryPreviewData[];
}

export interface GalleryPreviewData {
  id: number;
  text: string;
  image: any;
}
