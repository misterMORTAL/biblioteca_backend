import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { RentalsModule } from './rentals/rentals.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { PublishersModule } from './publishers/publishers.module';
import { ReadersModule } from './readers/readers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './authors/author.entity';
import { BookEntity } from './books/book.entity';
import { CategoryEntity } from './categories/category.entity';
import { PublisherEntity } from './publishers/publisher.entity';
import { ReaderEntity } from './readers/reader.entity';
import { RentalEntity } from './rentals/rental.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    BooksModule,
    RentalsModule,
    AuthorsModule,
    CategoriesModule,
    PublishersModule,
    ReadersModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jose',
      password: '123',
      database: 'library',
      entities: [
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        PublisherEntity,
        ReaderEntity,
        RentalEntity,
        UserEntity,
      ],
      synchronize: true,
    }),

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false,
          auth: {
            user: 'apikey',
            pass: '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',
          },
        },
        defaults: {
          from: 'jgc.araujo@yavirac.edu.ec',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
