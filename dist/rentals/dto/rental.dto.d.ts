import { BookEntity } from 'src/books/book.entity';
import { ReaderEntity } from 'src/readers/reader.entity';
export declare class RentalDTO {
    reader: ReaderEntity;
    book: BookEntity;
    departureDate: Date;
    entryDate: Date;
}
