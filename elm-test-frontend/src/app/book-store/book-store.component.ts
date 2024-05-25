import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/configservice.service';
import { ImportsModule } from '../imports';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css'],
  standalone: true,
  imports: [ImportsModule]

})
export class BookStoreComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private configService: ConfigService) {

    this.formGroup = this.formBuilder.group({
      bookTitle: [''],
      bookDescription: [''],
      author: [''],
      publishDate:  new FormControl<Date | null>(null),
    });


  }
  formGroup: FormGroup;

  items: any = [];

  filter = {
    "bookTitle": "",
    "bookDescription": "",
    "author": "",
    "publishDate": "",
    "pageNumber": 1,
    "pageSize": 10
  };

  ngOnInit(): void {


    this.getBooks(false);
  }

  search() {
    debugger
    this.filter.author = this.formGroup.value.author
    this.filter.bookDescription = this.formGroup.value.bookDescription
    this.filter.bookTitle = this.formGroup.value.bookTitle
    this.filter.publishDate = this.formGroup.value.publishDate

    this.getBooks(false);
  }

  getBooks(isScrolling: any) {

    this.configService.getStoreBook(this.filter).subscribe(
      (data) => {
        if(data)
        if (isScrolling) {
          this.items = [...this.items, ...data];  // Using spread operator to concatenate arrays

        } else {
          this.items = data;

        }
        // Assuming data is directly the configuration
      },
      (error) => {
        console.error('Error fetching configuration:', error);
      }
    );
  }


  onScroll(event: any) {

    this.filter.pageNumber = this.filter.pageNumber + 1

    this.getBooks(true);
  }

}
