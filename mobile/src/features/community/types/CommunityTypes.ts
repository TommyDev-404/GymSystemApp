
export type CreatePostResponse = {
   message: string;
   data: {
      id: number;
      content: string;
      images: {
         id: number;
         image_url: string;
      }[];
   };
};
 