import { schema } from 'normalizr';

export const photo = new schema.Entity('photos');
export const photoList = new schema.Array(photo);

export const album = new schema.Entity('albums');
export const albumList = new schema.Array(album);
export const photoWithAlbum = new schema.Entity('photos', { album });
