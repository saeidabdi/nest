import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
    private bookmarks: Bookmark[] = [];

    findById(id: string): Bookmark {

        return this.bookmarks.find(b => b.id == id)
    }

    find(getBookmarkDto: GetBookmarkDto): Bookmark[] {
        let bookmarks = this.bookmarks;
        const { url, desc } = getBookmarkDto;
        if (url)
            bookmarks = bookmarks.filter(b => b.url.toLowerCase().includes(url))

        if (desc)
            bookmarks = bookmarks.filter(b => b.desc.toLowerCase().includes(desc))

        return bookmarks
    }

    createBookmrak(createBookmarkDto: CreateBookmarkDto) {
        const { url, desc } = createBookmarkDto
        const bookmark: Bookmark = {
            id: uuid(),
            url,
            desc,
        }

        this.bookmarks.push(bookmark);

        return bookmark;
    }

    deleteBookmrak(id: string): void {
        this.bookmarks = this.bookmarks.filter((b) => b.id != id)
    }
}
