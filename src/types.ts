export interface Image {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
}

export interface ImageData {
  total_pages: number;
  results: Image[];
}
