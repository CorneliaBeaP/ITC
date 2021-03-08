import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-attribute-tags',
  templateUrl: './attribute-tags.component.html',
  styleUrls: ['./attribute-tags.component.scss']
})
export class AttributeTagsComponent implements OnInit {

  @Input() name: string;
  @Input() id: number;
  @Output() removedAttribute = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  remove(id: number) {
    this.removedAttribute.emit(id);
  }
}
