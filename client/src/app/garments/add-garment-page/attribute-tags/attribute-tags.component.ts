import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-tags',
  templateUrl: './attribute-tags.component.html',
  styleUrls: ['./attribute-tags.component.scss']
})
export class AttributeTagsComponent implements OnInit {

  @Input() name: string;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
